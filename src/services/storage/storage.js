/**
 * A centralized storage service to abstract window.localStorage interactions.
 * This provides safe parsing, stringifying, and error handling.
 */
const storage = {
	/**
	 * Get an item from storage
	 * @param {string} key 
	 * @param {any} defaultValue 
	 * @returns {any}
	 */
	get: (key, defaultValue = null) => {
		try {
			const item = window.localStorage.getItem(key);
			if (item === null) return defaultValue;
			return JSON.parse(item);
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return defaultValue;
		}
	},

	/**
	 * Set an item in storage
	 * @param {string} key 
	 * @param {any} value 
	 */
	set: (key, value) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	},

	/**
	 * Remove an item from storage
	 * @param {string} key 
	 */
	remove: (key) => {
		try {
			window.localStorage.removeItem(key);
		} catch (error) {
			console.warn(`Error removing localStorage key "${key}":`, error);
		}
	},

	/**
	 * Clear all items from storage
	 */
	clear: () => {
		try {
			window.localStorage.clear();
		} catch (error) {
			console.warn(`Error clearing localStorage:`, error);
		}
	}
};

export default storage;
