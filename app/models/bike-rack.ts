export class BikeRack {
  id: number;
  name: string;
  latitude: string;

  constructor(
    obj: any
  ) {
    this.id = obj.id;
    this.name = obj.name;
    this.latitude = obj.latitude;
  }

}
