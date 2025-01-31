export class User {
  constructor(
    public uid: string,
    public email: string,
    public displayName: string | null,
    private _token: string,
    private _tokenExpirationDate: Date,
    public role: string,
    public admin: boolean = false

  ) {}

  get token(): string | null {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
