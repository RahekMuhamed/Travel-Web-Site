import { Services } from "./services";

export class Package {
  constructor(
    public id: number,
    public name: string,
    public isDeleted: boolean,
    public description?: string,
    public image?: string ,
    public quantityAvailable?: number,
    public price?: number,
    public startDate?: Date,
    public duration?: number,
    public endDate?: Date,// view only
    public firstLocation?: number,
    public secondLocation?: number,
    public firstLocationDuration?: number,
    public secondLocationDuration?: number,// view only
   // public bookingPackages: BookingPackage[],
   //public lovePackages: LovePackage[],
  // public adminId: string | undefined,
  // public admin: admin,
   //public services: Services[]=[]
  ) {}
}
