// user.ts
export class User {
  public id: string;
  public fname: string;
  public email: string;
  public gender: string;
  public roles: string[];

  constructor(user: any) {
    this.id = user.id;
    this.fname = user.fname || '';
    this.email = user.email || '';
    this.gender = user.gender || '';
    this.roles = user.roles || [];
  }
}
