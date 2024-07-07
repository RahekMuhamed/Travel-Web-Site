export class BookingPackage {
    /* bookingPackageId ,price : i use it as a response from addbooking , i dont add them in add booking , i use them for pasing 
    them for payment url as query params*/

    // from backend i receive Dto Which i represent the necceray data here 
    // for adding from front i need clientId, and PackageId only, so the remainging are optional
    constructor(public packageId: number, public id?: number, public clientId?: string, public price?: number,
        public packageImage?:string
    )//clientId
    {
        
    }
}
