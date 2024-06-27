export class BookingPackage {

    // bookingPackageId ,price : i use it as a response from addbooking , i dont add them
    // from backend i receive Dto Which i represent the necceray data here 
    // for adding from front i need clientId, and PackageId only, so the remainging are optional
    constructor(public packageId: number,public bookingPackageId?: number,public clientId?:string ,public price?:number)//clientId
    {

    }
}
