/**
 * @typedef {Object} LocalizedString
 * @property {string} en - English translation
 * @property {string} ar - Arabic translation
 */

/**
 * @typedef {Object} ProductReviewStats
 * @property {number} rating - Average rating (0 to 5)
 * @property {number} count - Total number of reviews
 */

/**
 * @typedef {Object} ProductInventory
 * @property {number} quantity - Quantity available in stock
 * @property {string} status - Current inventory state (In Stock, Out of Stock, etc)
 */

/**
 * @typedef {Object} ProductPrice
 * @property {number} current - Current selling price
 * @property {number} [original] - Original price before discount
 * @property {number} [discount] - Discount percentage (e.g. 15 for 15%)
 */

/**
 * @typedef {Object} ProductBadge
 * @property {string} type - e.g., 'sale', 'new', 'bestseller'
 * @property {LocalizedString} label - Label to display on the badge
 */

/**
 * @typedef {Object} ProductMeta
 * @property {string} [sku] - Stock Keeping Unit
 * @property {string} [country] - Country of Origin
 * @property {string} [warranty] - Warranty period
 * @property {string} [delivery] - Delivery estimation
 */

/**
 * @typedef {Object} ProductData
 * @property {string|number} id - Unique product identifier
 * @property {LocalizedString} title - Product name
 * @property {LocalizedString} [category] - Primary category name
 * @property {string} [brand] - Brand name
 * @property {string} [brandLogo] - Brand logo URL
 * @property {string} image - Primary product image URL
 * @property {string} [hoverImage] - Secondary product image URL for hover state
 * @property {ProductPrice} price - Pricing information
 * @property {ProductReviewStats} [reviews] - Review statistics
 * @property {ProductInventory} [stock] - Stock availability
 * @property {ProductBadge[]} [badges] - Badges to display (New, Sale)
 * @property {ProductMeta} [meta] - Metadata (SKU, Warranty)
 * @property {boolean} [isPrescriptionRequired] - Indicates if a medical prescription is needed
 * @property {boolean} [isOfficialDistributor] - Indicates if sold by official distributor
 */

export {};
