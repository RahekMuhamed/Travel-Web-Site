import { Services } from "./services";

export class Category{

  constructor(
      public  id: number,
 public name: string,
 public description: string,
 public isDeleted: boolean,
 public serviceNames: Services[]
  )
  {
 
  }
}