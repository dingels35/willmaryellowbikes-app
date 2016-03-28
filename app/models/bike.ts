export class Bike {
  id: number;
  identifier: string;
  description: string;
  bike_rack_name: string;
  broken: boolean;
  abandoned: boolean;

  constructor(
    obj: any
  ) {
    this.id = obj.id;
    this.identifier = obj.identifier;
    this.description = obj.description;
    this.bike_rack_name = obj.bike_rack_name;
    this.broken = obj.broken;
    this.abandoned = obj.abandoned;
  }

}