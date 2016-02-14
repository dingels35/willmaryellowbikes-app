import {Injectable} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import {Bike} from '../models/bike';
import {BaseService} from './base-service';
import 'rxjs/add/operator/map';


@Injectable()
export class BikeService extends BaseService {

  constructor(public http: AuthHttp) {
    super();
  }

  all() {
    return this.http.get(this.url + 'bikes')
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

  find(id: number) {
    return this.http.get(this.url + 'bikes/' + id)
      .map(res => res.json().bike)
      .map((bike: any) => {
        return new Bike(bike);
      });
  }


}
