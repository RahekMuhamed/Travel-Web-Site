export class Wishlist {

     constructor(
    public id: number,
 public date: string,
 public isDeleted: boolean,
 public clientId: string,
 public packageId: number,
public packageName:string,
public packageDescription:string,
public packagePrice: number
 
  ) {}
}
