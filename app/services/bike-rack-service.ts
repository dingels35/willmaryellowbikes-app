import {Injectable} from 'angular2/core';
import {AuthHttp} from '../vendor/angular2-jwt/angular2-jwt';
import {BikeRack} from '../models/bike-rack';
import {BaseService} from './base-service';
import 'rxjs/add/operator/map';


@Injectable()
export class BikeRackService extends BaseService {

  constructor(public http:AuthHttp) {
    super();
  }

  all() {
    return this.http.get(this.url + 'bike_racks')
      .map(res => res.json().bike_racks)
      .map((bikeRacks: Array<any>) => {
        let result:Array<BikeRack> = [];
        if (bikeRacks) {
          bikeRacks.forEach((obj) => {
            result.push(new BikeRack(obj));
          });
        }
        return result;
      });
  }

  find(id: number) {
    return this.http.get(this.url + 'bike_racks/' + id)
      .map(res => res.json().bike_rack)
      .map((bikeRack: any) => {
        return new BikeRack(bikeRack);
      });
  }

  closest(lat: number, long: number) {
    return this.http.get(this.url + 'bike_racks/closest?lat=' + lat + '&long=' + long)
      .map(res => res.json().bike_rack)
      .map((bikeRack: any) => {
        return new BikeRack(bikeRack);
      });
  }


}
