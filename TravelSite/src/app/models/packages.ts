export class Package {
  constructor(
      public id: number,
    public name: string,
    public firstLocation?: number,
    public isDeleted?: boolean,
    public BookingTimeAllowed?:number,
    public secondLocation?: number,
    public services?: string[],
    public description?: string,
    public imageUrl?: string,
     public image?: string ,
    public quantityAvailable?: number,
    public price?: number,
    public startDate?: Date,
    public endDate?: Date,
    public duration?: number,
    public liked: boolean = false  ,
    public firstLocationDuration?: number,
    public secondLocationDuration?: number,
    public isInWishlist?: boolean,
    public wishlistItemId?: number | null
     
) {}

}
