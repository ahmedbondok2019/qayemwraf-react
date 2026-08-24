/**
 * @typedef {Object} WishlistItem
 * @property {string} productId
 * @property {import("./product").Product} [product]
 * @property {string} addedAt
 */

/**
 * @typedef {Object} Wishlist
 * @property {string} id
 * @property {string} userId
 * @property {WishlistItem[]} items
 */
export {};
