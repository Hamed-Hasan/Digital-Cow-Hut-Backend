export class APIError extends Error {
    statusCode: number;
    errorMessages?: any[];
  
    constructor(message: string, statusCode?: number, errorMessages?: any[]) {
      super(message);
      this.statusCode = statusCode || 500;
      this.errorMessages = errorMessages || [];
    }
    
  }
  