export class BookingService {
  id: number;
  quantity?: number;
  data?: Date;
  allowingTime?: Date;
  isDeleted: boolean;
  payment?: Payment;
  clientId?: string;
  client?: Client;
  serviceId?: number;
  service?: Service;

  constructor(
    id: number,
    quantity?: number,
    data?: Date,
    allowingTime?: Date,
    isDeleted: boolean = false,
    payment?: Payment,
    clientId?: string,
    client?: Client,
    serviceId?: number,
    service?: Service
  ) {
    this.id = id;
    this.quantity = quantity;
    this.data = data;
    this.allowingTime = allowingTime;
    this.isDeleted = isDeleted;
    this.payment = payment;
    this.clientId = clientId;
    this.client = client;
    this.serviceId = serviceId;
    this.service = service;
  }
}

export class Payment {
  // Define properties of Payment class here
}

export class Client {
  // Define properties of Client class here
}

export class Service {
  // Define properties of Service class here
}
