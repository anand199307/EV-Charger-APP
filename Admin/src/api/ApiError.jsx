class ApiError extends Error {
  constructor(message, options) {
    super(message);
    this.options = options;
  }
}
