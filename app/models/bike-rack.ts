import {Http, Headers} from 'angular2/http';

export class BikeRack {
  id: number;
  name: string;

  constructor(
    id: integer,
    name: string
    // public latitude: decimal,
    // public longitude: decimal,
    // public bike_count: integer
  ) {
    this.id = id;
    this.name = name;
  }

}
