import { Package } from "./packages";

export class Services {
  constructor(
    public id: number,
  public name: string,
  public quantityAvailable: number = 4,
  public description?: string,
  public image?: string,
  public startDate?: Date,
  public price?: number,
  public isDeleted?: boolean,
 
 // public bookingServices: BookingService[],
 //  public loveServices: LoveService[],
   public categoryId?: number | undefined,
  // public category: Category,
  public  serviceProviderId?: number | undefined,
 // public  serviceProvider: ServiceProvider,
   public packages: Package[]=[]
  ) {}
}
