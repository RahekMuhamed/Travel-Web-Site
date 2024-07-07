import { Package } from "./packages";

export class Services {
  constructor(
    public id: number,
    public name: string,
    public quantityAvailable: number = 4,
    public description?: string,
    public image?: string,
    public startDate?: Date,// droplist
    public price?: number ,
    public isDeleted?: boolean,
    public bookingTimeAllowed?: number,//view
    public goingFlightTime?: Date,
    public comingFlightTime?: Date,
    public goingFlightSource?: string,
    public goingFlightDestination?: string,
    public comingBackFlightSource?: string,
    public comingBackFlightDesination?: string,
    public holtelLocation?: number,//[0:makkah , 1:madinah]
    //public numberOFAvailableRooms?: number,
    public numberOFPersons?: number,
    public duration?: number, // calculate
    public endDate?:Date ,//choose
 // public bookingServices: BookingService[],
 //  public loveServices: LoveService[],
   public categoryId?: number | undefined,
  // public category: Category,
  public  serviceProviderId?: number | undefined,
 // public  serviceProvider: ServiceProvider,
   public packages: Package[]=[]
  ) {}
}
