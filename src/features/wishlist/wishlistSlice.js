import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "@/services/storage/storage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";
import wishlistApi from "./api/wishlistApi";
import { getOrCreateTempUserId } from "@/features/cart/cartSlice";

// Load initial state from storage if it exists (Guest checkout cache pattern)
const persistedWishlist = storage.get(STORAGE_KEYS.WISHLIST, {
	items: [], // Array of products
	count: 0
});

const initialState = {
	...persistedWishlist,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
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

// Robust mapping of backend product records to frontend compatible structure
const mapBackendProduct = (prod) => {
	if (!prod) return null;

	const finalPrice = prod.final_price || prod.special_price || prod.sale_price;
	const basePrice = prod.price;

	const unitPrice = parsePrice(finalPrice) || (basePrice && typeof basePrice === 'object' ? parsePrice(basePrice.current) : parsePrice(basePrice));
	const originalPrice = basePrice && typeof basePrice === 'object' ? parsePrice(basePrice.original) : (parsePrice(basePrice) || unitPrice);

	const frontendProductId = formatProductIdForFrontend(prod.id);

	const imageList = mapImages(prod.images || prod.gallery, prod.image || prod.primary_image);
	const primaryImage = resolveImageUrl(prod.image || prod.primary_image) || imageList[0] || "";

	const titleValue = prod.title || prod.name || prod.translation?.name || prod.translation?.title || "";

	return {
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
	};
};

// Async Thunks
export const fetchWishlist = createAsyncThunk(
	"wishlist/fetchWishlist",
	async (_, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;
			const response = await wishlistApi.getWishlist(tempUserId);
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const toggleWishlist = createAsyncThunk(
	"wishlist/toggleWishlist",
	async (product, { getState, dispatch, rejectWithValue }) => {
		try {
			const state = getState();
			const isAuthenticated = state.auth?.isAuthenticated;
			const tempUserId = !isAuthenticated ? getOrCreateTempUserId() : null;

			const response = await wishlistApi.toggleWishlist(product.id, tempUserId);
			// Sync with backend by re-fetching the updated wishlist
			dispatch(fetchWishlist());
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		clearWishlist: (state) => {
			state.items = [];
			state.count = 0;
			state.status = "idle";
			state.error = null;
			storage.remove(STORAGE_KEYS.WISHLIST);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWishlist.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchWishlist.fulfilled, (state, action) => {
				state.status = "succeeded";
				const responseData = action.payload;

				let wishlistItems = [];
				if (Array.isArray(responseData)) {
					wishlistItems = responseData;
				} else if (responseData && Array.isArray(responseData.items)) {
					wishlistItems = responseData.items;
				} else if (responseData && responseData.data) {
					const data = responseData.data;
					if (Array.isArray(data)) {
						wishlistItems = data;
					} else if (Array.isArray(data.items)) {
						wishlistItems = data.items;
					}
				}

				// The items returned by backend wishlist might be actual products, or wrap products as `{ product: ... }`
				state.items = wishlistItems
					.map(item => {
						if (!item) return null;
						if (item.product) return mapBackendProduct(item.product);
						return mapBackendProduct(item);
					})
					.filter(Boolean);

				state.count = state.items.length;

				// Persist changes
				storage.set(STORAGE_KEYS.WISHLIST, {
					items: state.items,
					count: state.count
				});
			})
			.addCase(fetchWishlist.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error?.message || "Failed to fetch wishlist";
			});
	},
});

export const { clearWishlist } = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.count;
export const selectWishlistStatus = (state) => state.wishlist.status;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectIsWishlisted = (productId) => (state) =>
	state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
