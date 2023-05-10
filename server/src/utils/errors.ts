class DomainError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NotFoundError extends DomainError {
  resourceName: any;
  resourceId: any;

  constructor({ resourceName, resourceId }: any) {
    super(
      `Recurso '${resourceName}' com identificador '${resourceId}' não encontrado.`
    );
    this.name = this.constructor.name;
    this.resourceName = resourceName;
    this.resourceId = resourceId;
  }
}

class ValidationError extends DomainError {
  validations: any;

  constructor({ message = 'Parâmetros inválidos', validations }: any) {
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

  constructor(cause = 'não especificada') {
    super('O usuário não pôde ser autenticado');
    this.name = this.constructor.name;
    this.cause = cause;
  }
}

class AuthorizationError extends DomainError {
  cause: string;

  constructor(cause = 'não especificada') {
    super('O usuário não está autorizado');
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
