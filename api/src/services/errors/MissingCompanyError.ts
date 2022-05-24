export class MissingCompanyError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "MissingCompanyError";

    Object.setPrototypeOf(this, MissingCompanyError.prototype);
  }
}