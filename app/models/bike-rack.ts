export class BikeRack {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  bike_count: number;

  constructor(
    obj: any
  ) {
    this.id = obj.id;
    this.name = obj.name;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
    this.bike_count = obj.bike_count;
  }

}
