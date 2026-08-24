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

export const wishlistApi = {
	/**
	 * Get all wishlist items
	 * @param {string} [tempUserId] - Optional. Required if user is not authenticated.
	 */
	getWishlist: (tempUserId) => {
		const config = {};
		if (tempUserId) {
			config.params = { temp_user_id: tempUserId };
		}
		return api.get(API_ENDPOINTS.WISHLIST, config);
	},

	/**
	 * Toggle wishlist status for a product
	 * @param {number|string} productId - The ID of the product.
	 * @param {string} [tempUserId] - Optional. Required if user is not authenticated.
	 */
	toggleWishlist: (productId, tempUserId) => {
		const data = {
			product_id: cleanProductId(productId),
		};
		if (tempUserId) {
			data.temp_user_id = tempUserId;
		}
		return api.post(API_ENDPOINTS.TOGGLE_WISHLIST, data);
	},
};

export default wishlistApi;
