// user.ts
export class User {
  public id: string;
  public fname: string;
  public email: string;
  public gender: string;
  public roles: string[];
  public passport: string;
  public phoneNumber: string;
  public residanceCountry: string;

  constructor(user: any) {
    this.id = user.id;
    this.fname = user.fname || '';
    this.email = user.email || '';
    this.gender = user.gender || '';
    this.roles = user.roles || [];
    this.passport = user.passport||'';
    this.phoneNumber = user.phoneNumber||'';
    this.residanceCountry = user.residanceCountry || '';
  }
}
