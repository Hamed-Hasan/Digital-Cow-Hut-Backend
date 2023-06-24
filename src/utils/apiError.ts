export class APIError extends Error {
  statusCode: number;
  errorMessages: string[];

  constructor(message: string, statusCode: number, errorMessages: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
  }
}
