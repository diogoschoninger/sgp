class DomainError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NotFoundError extends DomainError {
  resourceName: any;
  resourceId: any;

  constructor({ resourceName, resourceId }: any) {
    super(`Resource ${resourceName} with identifier ${resourceId} not found.`);
    this.name = this.constructor.name;
    this.resourceName = resourceName;
    this.resourceId = resourceId;
  }
}

class ValidationError extends DomainError {
  validations: any;

  constructor({ message = 'Invalid parameters', validations }: any) {
    super(message);
    this.name = this.constructor.name;
    this.validations = validations;
  }
}

class ConflictError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class AuthenticationError extends DomainError {
  cause: string;

  constructor(cause = 'not specified') {
    super('The user could not be authenticated');
    this.name = this.constructor.name;
    this.cause = cause;
  }
}

class AuthorizationError extends DomainError {
  cause: string;

  constructor(cause = 'not specified') {
    super('The user is not authorized');
    this.name = this.constructor.name;
    this.cause = cause;
  }
}

export {
  NotFoundError,
  ValidationError,
  ConflictError,
  AuthenticationError,
  AuthorizationError,
};
