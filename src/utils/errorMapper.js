/**
 * Normalizes an API error response into a consistent structure.
 * 
 * Expected backend error format:
 * {
 *   "success": false,
 *   "message": "Validation failed",
 *   "errors": {
 *     "email": ["The email is already taken."],
 *     "phone": ["Invalid phone number."]
 *   }
 * }
 * 
 * @param {Object} error - The error object caught from axios (usually error.response.data)
 * @returns {Object} { fieldErrors: Object, generalMessage: string, status: number }
 */
export const normalizeApiError = (error) => {
	const result = {
		fieldErrors: {},
		generalMessage: "Something went wrong. Please try again.",
		status: error?.status || 500,
	};

	if (!error) return result;

	// Extract general message
	if (error.message) {
		result.generalMessage = error.message;
	} else if (typeof error === "string") {
		result.generalMessage = error;
	}

	// Extract field-specific validation errors
	if (error.errors && typeof error.errors === "object") {
		Object.keys(error.errors).forEach(field => {
			const fieldError = error.errors[field];
			// Take the first error message for the field if it's an array
			result.fieldErrors[field] = Array.isArray(fieldError) ? fieldError[0] : fieldError;
		});
	}

	return result;
};
