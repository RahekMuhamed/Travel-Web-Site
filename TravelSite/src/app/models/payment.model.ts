export class Payment {
  id: number;
  amount?: number;
  paymentDate?: Date;
  method?: string;
  isDeleted: boolean = false;
  paymentStatus?: string;
  payPalOrderId?: string;
  bookingPackageId?: number;
  bookingPackage?: BookingPackage;
  bookingServiceId?: number;
  bookingService?: BookingService;

  constructor(
    id: number,
    amount?: number,
    paymentDate?: Date,
    method?: string,
    isDeleted: boolean = false,
    paymentStatus?: string,
    payPalOrderId?: string,
    bookingPackageId?: number,
    bookingPackage?: BookingPackage,
    bookingServiceId?: number,
    bookingService?: BookingService
  ) {
    this.id = id;
    this.amount = amount;
    this.paymentDate = paymentDate;
    this.method = method;
    this.isDeleted = isDeleted;
    this.paymentStatus = paymentStatus;
    this.payPalOrderId = payPalOrderId;
    this.bookingPackageId = bookingPackageId;
    this.bookingPackage = bookingPackage;
    this.bookingServiceId = bookingServiceId;
    this.bookingService = bookingService;
  }
}

export class BookingPackage {
  // Define properties of BookingPackage class here
}

export class BookingService {
  // Define properties of BookingService class here
}
