import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {BikeRack} from '../models/bike-rack';
import 'rxjs/add/operator/map';


@Injectable()
export class BikeRackService {

  constructor(public http: Http) {
    this.url = 'http://lvh.me:3000';
  }

  all() {
    return this.http.get(this.url + '/api/bike_racks')
      .map(res => res.json().bike_racks);
      .map((bikeRacks: Array<any>) => {
        let result:Array<BikeRack> = [];
        if (bikeRacks) {
          bikeRacks.forEach((bikeRack) => {
            result.push(new BikeRack(bikeRack.id, bikeRack.name));
          });
        }
        return result;
      });
  }


}
