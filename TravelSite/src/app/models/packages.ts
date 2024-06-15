export class Package {
  constructor(
    public id: number,
    public name: string,
    public isDeleted: boolean,
    public description?: string,
    public image?: string,
    public quantityAvailable?: number,
    public price?: number,
    public startDate?: Date,
    public duration?: number
  ) {}
}
