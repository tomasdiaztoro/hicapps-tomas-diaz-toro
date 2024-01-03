import validateType from "../validators/validateType.js";

/**
 * Represent a Log.
 * @class
 */
export default class Log {
  /**
     * Creates a new Log instance.
     * @constructor
     * @param {string} message
     */
  constructor(
      message,
  ) {
    validateType(message, "string", "message");
    this.message = message;

    this.createdAt = Math.floor(Date.now() / 1000);
  }
}
