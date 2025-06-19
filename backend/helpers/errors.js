export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundError = (message = "Not found") =>
  new AppError(message, 404);

export const badRequestError = (message = "Bad request") =>
  new AppError(message, 400);

export const internalServerError = (message = "Internal server error") =>
  new AppError(message, 500);
