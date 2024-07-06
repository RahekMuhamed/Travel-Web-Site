import { Services } from "./services";

export class Package {
  constructor(
    public id: number,
    public name: string,
    public isDeleted: boolean,
    public description?: string,
    public imageUrl?: string ,
    public quantityAvailable?: number,
    public price?: number,
    public startDate?: Date,
    public duration?: number,
   // public bookingPackages: BookingPackage[],
   //public lovePackages: LovePackage[],
  // public adminId: string | undefined,
  // public admin: admin,
   public services: Services[]=[]
  ) {}
}
