export class CreatePayload {
  constructor(private payload: object) {}

  toString() {
    return JSON.stringify(this.payload || {});
  }
}
