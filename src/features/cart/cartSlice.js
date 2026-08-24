import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";
import cartApi from "./api/cartApi";

/**
 * @typedef {import('@/lib/models').CartItem} CartItem
 */

// Load initial state from storage if it exists (Guest checkout cache pattern)
const persistedCart = storage.get(STORAGE_KEYS.CART, {
	items: [],
	totalItems: 0,
	subtotal: 0,
	discount: 0,
	shipping: 0,
	total: 0,
});

const initialState = {
	...persistedCart,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

/**
 * Helper to generate or retrieve a unique temp_user_id for guest users.
 * @returns {string}
 */
export const getOrCreateTempUserId = () => {
	let tempUserId = storage.get(STORAGE_KEYS.TEMP_USER_ID);
	if (!tempUserId) {
		tempUserId = "guest_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
		storage.set(STORAGE_KEYS.TEMP_USER_ID, tempUserId);
	}
	return tempUserId;
};

/**
 * Helper to format a numeric ID back to frontend mock-compatible 'prod-X' format.
 * This bridges the gap between frontend mock IDs ('prod-5') and backend database IDs (5).
 * @param {string|number} productId 
 * @returns {string}
 */
const formatProductIdForFrontend = (productId) => {
	if (productId === undefined || productId === null) return "";
	if (typeof productId === "string" && productId.startsWith("prod-")) {
		return productId;
	}
	const parsed = parseInt(productId, 10);
	if (!isNaN(parsed)) {
		return `prod-${parsed}`;
	}
	return String(productId);
};

/**
 * Helper to construct absolute URLs for images starting with relative database paths.
 */
const resolveImageUrl = (url) => {
	if (!url) return "";
	if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
		return url;
	}
	const cleanPath = url.startsWith("/") ? url.substring(1) : url;
	return `https://egimedical.com/${cleanPath}`;
};

/**
 * Localize helper to ensure titles and localized values always support { en, ar } structure.
 */
const getLocalizedValue = (value) => {
	if (!value) return { en: "", ar: "" };
	if (typeof value === "object") {
		return {
			en: value.en || value.ar || "",
			ar: value.ar || value.en || ""
		};
	}
	return { en: value, ar: value };
};

/**
 * Map backend images schema to flat array of absolute URL strings
 */
const mapImages = (images, fallbackImage) => {
	if (Array.isArray(images) && images.length > 0) {
		return images.map(img => {
			if (typeof img === 'string') return resolveImageUrl(img);
			if (img && typeof img === 'object') return resolveImageUrl(img.image || img.url || "");
			return "";
		}).filter(Boolean);
	}
	return fallbackImage ? [resolveImageUrl(fallbackImage)] : [];
};

/**
 * Helper to parse numbers and prices safely from strings.
 */
const parsePrice = (value) => {
	if (value === undefined || value === null) return 0;
	if (typeof value === "number") return value;
	const parsed = parseFloat(value);
	return isNaN(parsed) ? 0 : parsed;
};

// Robust mapping of backend cart item records to frontend CartItem structures
const mapBackendCartItem = (item) => {
	const prod = item.product || {};

	// Determine the actual current price the user is paying
	const finalPrice = prod.final_price || prod.special_price || prod.sale_price;
	const basePrice = prod.price;

	const unitPrice = item.unitPrice || item.price || parsePrice(finalPrice) || (basePrice && typeof basePrice === 'object' ? parsePrice(basePrice.current) : parsePrice(basePrice));
	const originalPrice = basePrice && typeof basePrice === 'object' ? parsePrice(basePrice.original) : (parsePrice(basePrice) || unitPrice);

	const frontendProductId = formatProductIdForFrontend(item.product_id || item.productId || prod.id);

	const imageList = mapImages(prod.images || prod.gallery, prod.image || prod.primary_image);
	const primaryImage = resolveImageUrl(prod.image || prod.primary_image) || imageList[0] || "";

	const titleValue = prod.title || prod.name || prod.translation?.name || prod.translation?.title || "";

	return {
		id: item.id,
		productId: frontendProductId,
		product: {
			id: frontendProductId,
			sku: prod.sku || "",
			title: getLocalizedValue(titleValue),
			slug: prod.slug || String(frontendProductId),
			brand: prod.brand || "",
			category: prod.category || [],
			images: imageList,
			image: primaryImage,
			price: { current: unitPrice, original: originalPrice },
			reviews: {
				rating: parsePrice(prod.rating !== undefined ? prod.rating : (prod.reviews?.rating || 0)),
				count: parseInt(prod.rate_count !== undefined ? prod.rate_count : (prod.reviews?.count || prod.reviewsCount || 0), 10)
			},
			stock: {
				quantity: prod.stock?.quantity !== undefined ? prod.stock.quantity : (prod.quantity !== undefined ? prod.quantity : 99),
				inStock: prod.stock?.inStock !== undefined ? prod.stock.inStock : (prod.quantity > 0 || prod.ignore_quantity)
			},
			status: prod.status || "active",
		},
		quantity: item.quantity,
		unitPrice,
		subtotal: item.subtotal || (item.quantity * unitPrice),
		selectedVariant: item.selectedVariant || item.variant || null,
	};
};

// Helper to recalculate totals
const calculateTotals = (state) => {
	let totalItems = 0;
	let subtotal = 0;

	state.items.forEach(item => {
		totalItems += item.quantity;
		// Ensure subtotal per item is correct
		item.subtotal = item.quantity * item.unitPrice;
		subtotal += item.subtotal;
	});

	state.totalItems = totalItems;
	state.subtotal = subtotal;
	// total = subtotal - discount + shipping
	state.total = Math.max(0, state.subtotal - state.discount + state.shipping);

	// Persist changes
	storage.set(STORAGE_KEYS.CART, {
		items: state.items,
		totalItems: state.totalItems,
		subtotal: state.subtotal,
		discount: state.discount,
		shipping: state.shipping,
		total: state.total,
	});
};

// Async Thunks
export const fetchCart = createAsyncThunk(
	"cart/fetchCart",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;
			const response = await cartApi.getCart(tempUserId);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ product, quantity = 1, selectedVariant = null }, { getState, dispatch, rejectWithValue }) => {
		try {
			const state = getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const response = await cartApi.addToCart(product.id, quantity, tempUserId);
			// Sync with backend by re-fetching the updated cart
			dispatch(fetchCart());
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateQuantity = createAsyncThunk(
	"cart/updateQuantity",
	async ({ productId, quantity, selectedVariant = null }, { getState, dispatch, rejectWithValue }) => {
		try {
			const state = getState();
			const items = state.cart.items;
			const item = items.find(
				(i) => i.productId === productId &&
					JSON.stringify(i.selectedVariant) === JSON.stringify(selectedVariant)
			);

			if (!item || !item.id) {
				throw new Error("Cart item not found or missing ID");
			}

			let response;
			if (quantity === 0) {
				response = await cartApi.deleteCartItem(item.id);
			} else {
				response = await cartApi.updateCartItem(item.id, quantity);
			}

			// Sync with backend by re-fetching the updated cart
			dispatch(fetchCart());
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const removeFromCart = createAsyncThunk(
	"cart/removeFromCart",
	async ({ productId, selectedVariant = null }, { getState, dispatch, rejectWithValue }) => {
		try {
			const state = getState();
			const items = state.cart.items;
			const item = items.find(
				(i) => i.productId === productId &&
					JSON.stringify(i.selectedVariant) === JSON.stringify(selectedVariant)
			);

			if (!item || !item.id) {
				throw new Error("Cart item not found or missing ID");
			}

			const response = await cartApi.deleteCartItem(item.id);
			// Sync with backend by re-fetching the updated cart
			dispatch(fetchCart());
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const applyCoupon = createAsyncThunk(
	"cart/applyCoupon",
	async (code, { getState, dispatch, rejectWithValue }) => {
		try {
			const state = getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const response = await cartApi.applyCoupon(code, tempUserId);
			// Sync updated totals/discounts
			dispatch(fetchCart());
			return response.data || response;
		} catch (error) {
			return rejectWithValue(error.response?.data || error.message || error);
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.items = [];
			state.totalItems = 0;
			state.subtotal = 0;
			state.discount = 0;
			state.shipping = 0;
			state.total = 0;
			state.status = "idle";
			state.error = null;
			storage.remove(STORAGE_KEYS.CART);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.status = "succeeded";
				const responseData = action.payload;

				let cartItems = [];
				if (Array.isArray(responseData)) {
					cartItems = responseData;
				} else if (responseData && Array.isArray(responseData.items)) {
					cartItems = responseData.items;
					state.discount = responseData.discount !== undefined ? responseData.discount : state.discount;
					state.shipping = responseData.shipping !== undefined ? responseData.shipping : state.shipping;
				} else if (responseData && responseData.data) {
					const data = responseData.data;
					if (Array.isArray(data)) {
						cartItems = data;
					} else if (Array.isArray(data.items)) {
						cartItems = data.items;
						state.discount = data.discount !== undefined ? data.discount : state.discount;
						state.shipping = data.shipping !== undefined ? data.shipping : state.shipping;
					}
				}

				state.items = cartItems.map(mapBackendCartItem);
				calculateTotals(state);
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error?.message || "Failed to fetch cart";
			});
	},
});

export const { clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectCartItemById = (productId, variant = null) => (state) =>
	state.cart.items.find(item => item.productId === productId && JSON.stringify(item.selectedVariant) === JSON.stringify(variant));

export default cartSlice.reducer;
