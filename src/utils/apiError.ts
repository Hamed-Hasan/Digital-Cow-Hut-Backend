export class APIError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string, public errorMessages: any[]) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, APIError.prototype);
    }
  }
  