/**
 * @typedef {Object} UserAddress
 * @property {string} id
 * @property {string} title
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} city
 * @property {string} state
 * @property {string} country
 * @property {string} zipCode
 * @property {string} phone
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} fullName
 * @property {string} [phone]
 * @property {string} role
 * @property {UserAddress[]} [addresses]
 * @property {string} createdAt
 * @property {string} updatedAt
 */
export {};
