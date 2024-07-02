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
  ) {}
}
