const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor(message, status, code, isPublic) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.code = code;
        this.isPublic = isPublic;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {number} code - Error code
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, code = 1111, isPublic = true) {
        super(message, status, code, isPublic);
    }
}

module.exports = APIError;