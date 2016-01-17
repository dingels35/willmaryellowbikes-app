export class Bike {
  id: number;
  identifier: string;
  
  constructor(
    obj: any
  ) {
    this.id = obj.id;
    this.identifier = obj.identifier;
  }

}
