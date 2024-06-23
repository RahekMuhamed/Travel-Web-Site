export class Service {
  id: number;
  name: string;
  description?: string;
  image?: string;
  quantityAvailable: number = 4;
  startDate?: Date;
  price?: number;
  isDeleted?: boolean;
  bookingServices: BookingService[] = [];
  loveServices: LoveService[] = [];
  categoryId?: number;
  category?: Category;
  serviceProviderId?: number;
  serviceProvider?: ServiceProvider;
  packages: Package[] = [];

  constructor(
    id: number,
    name: string,
    description?: string,
    image?: string,
    quantityAvailable: number = 4,
    startDate?: Date,
    price?: number,
    isDeleted?: boolean,
    bookingServices: BookingService[] = [],
    loveServices: LoveService[] = [],
    categoryId?: number,
    category?: Category,
    serviceProviderId?: number,
    serviceProvider?: ServiceProvider,
    packages: Package[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.quantityAvailable = quantityAvailable;
    this.startDate = startDate;
    this.price = price;
    this.isDeleted = isDeleted;
    this.bookingServices = bookingServices;
    this.loveServices = loveServices;
    this.categoryId = categoryId;
    this.category = category;
    this.serviceProviderId = serviceProviderId;
    this.serviceProvider = serviceProvider;
    this.packages = packages;
  }
}

export class BookingService {
  // Define properties of BookingService class here
}

export class LoveService {
  // Define properties of LoveService class here
}

export class Category {
  // Define properties of Category class here
}

export class ServiceProvider {
  // Define properties of ServiceProvider class here
}

export class Package {
  // Define properties of Package class here
}
