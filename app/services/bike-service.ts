import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Bike} from '../models/bike';
import {BaseService} from './base-service';
import 'rxjs/add/operator/map';


@Injectable()
export class BikeService extends BaseService {

  constructor(public http: Http) {
    super();
  }

  all() {
    return this.http.get(this.url + '/api/bikes')
      .map(res => res.json().bikes)
      .map((bikeRacks: Array<any>) => {
        let result:Array<Bike> = [];
        if (bikeRacks) {
          bikeRacks.forEach((obj) => {
            result.push(new Bike(obj));
          });
        }
        return result;
      });
  }


}
