import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {BikeRack} from '../models/bike-rack';
import {BaseService} from './base-service';
import 'rxjs/add/operator/map';


@Injectable()
export class BikeRackService extends BaseService {

  constructor(public http: Http) {
    super();
  }

  all() {
    return this.http.get(this.url + '/api/bike_racks')
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


}
