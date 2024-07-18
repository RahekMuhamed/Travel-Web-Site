import { Package } from "./packages";

export class Services {
  constructor(
    public id: number,
    public name: string,
    public quantityAvailable: number = 4,
    public description?: string,
    public image?: string,
    public startDate?: Date, // dropdown list
    public price?: number,
    public isDeleted?: boolean,
    public bookingTimeAllowed?: number, // view
    public goingFlightTime: Date | null = null,
    public comingFlightTime: Date | null = null,
    public goingFlightSource: string | null = null,
    public goingFlightDestination: string | null = null,
    public comingBackFlightSource: string | null = null,
    public comingBackFlightDesination: string | null = null,
    public holtelLocation: number | null = null, // [0:makkah, 1:madinah]
    // public numberOFAvailableRooms?: number,
    public numberOFPersons: number | null = null,
    public duration: number | null = null, // calculate
    public endDate: Date | null = null, // choose
    // public bookingServices: BookingService[],
    // public loveServices: LoveService[],
    public categoryId: number | null = null,
    // public category: Category,
    public serviceProviderId: number | null = null,
    // public serviceProvider: ServiceProvider,
    public packages: Package[] = []
  ) {}
}
