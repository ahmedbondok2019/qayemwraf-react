import api from "@/services/api/client";
import { API_ENDPOINTS } from "@/services/api/endpoints";

/**
 * Clean product ID to ensure it is a numeric ID when sent to the backend.
 * Handles "prod-5" -> 5
 */
const cleanProductId = (id) => {
	if (typeof id === 'string') {
		const match = id.match(/\d+/);
		return match ? parseInt(match[0], 10) : id;
	}
	return id;
};

export const cartApi = {
	/**
	 * Get all items in the cart
	 * @param {string} [tempUserId] - Optional. Required if user is not authenticated.
	 */
	getCart: (tempUserId) => {
		const config = {};
		if (tempUserId) {
			config.params = { temp_user_id: tempUserId };
		}
		return api.get(API_ENDPOINTS.CART, config);
	},

	/**
	 * Add a product to the cart
	 * @param {number|string} productId - The ID of the product.
	 * @param {number} [quantity=1] - The quantity of the product.
	 * @param {string} [tempUserId] - Optional. Required if user is not authenticated.
	 */
	addToCart: (productId, quantity = 1, tempUserId) => {
		const data = {
			product_id: cleanProductId(productId),
			quantity,
		};
		if (tempUserId) {
			data.temp_user_id = tempUserId;
		}
		return api.post(API_ENDPOINTS.ADD_TO_CART, data);
	},

	/**
	 * Update quantity of a cart item
	 * @param {number|string} id - The ID of the cart item.
	 * @param {number} quantity - The new quantity.
	 */
	updateCartItem: (id, quantity) => {
		return api.post(`${API_ENDPOINTS.CART}/${id}`, { quantity });
	},

	/**
	 * Remove an item from the cart
	 * @param {number|string} id - The ID of the cart item.
	 */
	deleteCartItem: (id) => {
		return api.delete(`${API_ENDPOINTS.CART}/${id}`);
	},

	applyCoupon: (code, tempUserId) => {
		const data = { coupon_code: code };
		if (tempUserId) {
			data.temp_user_id = tempUserId;
		}
		return api.post(API_ENDPOINTS.CHECKOUT_APPLY_COUPON, data);
	},
};

export default cartApi;
