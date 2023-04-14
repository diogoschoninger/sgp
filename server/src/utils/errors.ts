class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends DomainError {
  validations: any;
  constructor({ message = 'Invalid parameters', validations }: any) {
    super(message);
    this.validations = validations;
  }
}

export { ValidationError };
