export class Serviceprovider {
    constructor(
      public id: number,
      public name: string,
      public isDeleted: boolean,
      public services: string[],
      public description?: string,
      public logo?: string ,
    ) {}
  }

