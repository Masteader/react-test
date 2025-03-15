export class TokenDetails {
  private _unique_name: string = "";
  private _sub: number = 0;  //userId
  private _email: string = "";
  private _companyId: number = 0;
  private _exp: number = 0;
  private _iss: string = "";

  constructor(data?: Partial<TokenDetails>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  get uniqueName(): string {
    return this._unique_name;
  }

  get sub(): number {
    return this._sub;
  }

  get email(): string {
    return this._email;
  }

  get companyId(): number {
    return this._companyId;
  }

  get expiration(): number {
    return this._exp;
  }

  get issuer(): string {
    return this._iss;
  }

  set uniqueName(value: string) {
    this._unique_name = value;
  }

  set sub(value: number) {
    this._sub = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set companyId(value: number) {
    this._companyId = value;
  }

  set expiration(value: number) {
    this._exp = value;
  }

  set issuer(value: string) {
    this._iss = value;
  }
}
