export class UserOwnSignUp {
  // tslint:disable-next-line:variable-name
  private _firstName: string;
  // tslint:disable-next-line:variable-name
  private _email: string;
  // tslint:disable-next-line:variable-name
  private _password: string;
  // tslint:disable-next-line:variable-name
  private _isUbs: boolean;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get isUbs(): boolean {
    return this._isUbs;
  }

  set isUbs(value: boolean) {
    this._isUbs = value;
  }
}
