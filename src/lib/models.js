/**
 * @fileoverview Domain Models for EG-Medical E-Commerce
 * These JSDoc definitions serve as the source of truth for the primary data structures.
 */

/**
 * @typedef {Object} Product
 * @property {string|number} id - Unique identifier for the product
 * @property {string} sku - Stock Keeping Unit
 * @property {Object} name - Localized name (e.g. { en: 'Name', ar: 'الاسم' })
 * @property {string} slug - URL friendly slug
 * @property {string} brand - Brand ID or Name
 * @property {Array<string>} category - Array of category IDs
 * @property {Array<string>} images - Array of image URLs (first is primary)
 * @property {Object} price
 * @property {number} price.current - Current selling price
 * @property {number} [price.original] - Original price before discount
 * @property {number} [discount] - Discount percentage (derived or absolute)
 * @property {number} rating - Average user rating (0-5)
 * @property {number} reviewsCount - Total number of reviews
 * @property {Object} stock
 * @property {number} stock.quantity - Available inventory
 * @property {boolean} stock.inStock - Boolean derived from quantity
 * @property {string} status - e.g. "active", "draft", "out_of_stock"
 * @property {Object} [metadata] - Additional flexible attributes
 */

/**
 * @typedef {Object} CartItem
 * @property {string|number} productId - Reference to Product ID
 * @property {Product} product - Full product snapshot (or partial if normalized)
 * @property {number} quantity - Number of units added to cart
 * @property {number} unitPrice - Price per single unit at time of adding
 * @property {number} subtotal - quantity * unitPrice
 * @property {Object} [selectedVariant] - e.g. size, color, or specific configuration
 */

/**
 * @typedef {Object} User
 * @property {string|number} id - Unique identifier
 * @property {string} name - Full name
 * @property {string} email - Email address
 * @property {string} [phone] - Contact number
 * @property {string} [avatar] - Profile picture URL
 * @property {Array<string>} roles - e.g. ['customer', 'admin']
 * @property {Array<string>} permissions - Specific capability flags
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - The authenticated user or null
 * @property {string|null} accessToken - JWT or similar token
 * @property {boolean} isAuthenticated - Derived boolean
 * @property {'idle'|'loading'|'succeeded'|'failed'} status - Async thunk state
 * @property {string|null} error - Error message if failed
 */

export {};
