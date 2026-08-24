/**
 * Format a number as a localized currency string
 * @param {number} amount - The numeric value to format
 * @param {string} currencyCode - ISO currency code (default: EGP)
 * @param {string} locale - 'en' or 'ar'
 * @returns {string} Formatted string
 */
export const formatCurrency = (amount, currencyCode = "EGP", locale = "en") => {
	if (typeof amount !== "number") return "";
	
	return new Intl.NumberFormat(locale === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
		style: "currency",
		currency: currencyCode,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

/**
 * Calculate the discount percentage if original price is provided
 * @param {number} currentPrice
 * @param {number} originalPrice
 * @returns {number|null} Discount percentage or null
 */
export const calculateDiscount = (currentPrice, originalPrice) => {
	if (!originalPrice || originalPrice <= currentPrice) return null;
	const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
	return Math.round(discount);
};

/**
 * Determine the unified stock state
 * @param {number} quantity 
 * @returns {string} "in-stock" | "out-of-stock" | "limited"
 */
export const getStockState = (quantity) => {
	if (quantity <= 0) return "out-of-stock";
	if (quantity <= 5) return "limited";
	return "in-stock";
};
