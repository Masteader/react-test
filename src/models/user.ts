export class TokenDetails {
  private _unique_name: string = "";
  private _sub: number = 0;  //userId
  private _email: string = "";
  private _companyId: number = 0;
  private _exp: number = 0;
  private _iss: string = "";

  constructor(data?: Partial<TokenDetails>) {
    if (data) {
      this._unique_name = data.unique_name ?? "";
      this._sub = data.sub ?? 0;
      this._email = data.email ?? "";
      this._companyId = data.companyId ?? 0;
      this._exp = data.exp ?? 0;
      this._iss = data.iss ?? "";
    }
  }


  get unique_name(): string {
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

  get exp(): number {
    return this._exp;
  }

  get iss(): string {
    return this._iss;
  }

  set unique_name(value: string) {
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

  set exp(value: number) {
    this._exp = value;
  }

  set iss(value: string) {
    this._iss = value;
  }
}
