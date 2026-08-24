/**
 * @typedef {Object} CartItem
 * @property {string} productId
 * @property {import("./product").Product} [product]
 * @property {number} quantity
 * @property {number} price
 */

/**
 * @typedef {Object} Cart
 * @property {CartItem[]} items
 * @property {number} totalItems
 * @property {number} totalPrice
 */
export {};
