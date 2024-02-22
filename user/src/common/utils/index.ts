export class CreatePayload<T> {
  constructor(private payload: T) {}

  toString() {
    return JSON.stringify(this.payload || {});
  }
}
