import {Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {BaseService} from './base-service';
import {Status} from '../models/status';
import 'rxjs/add/operator/map';


@Injectable()
export class StatusService extends BaseService {

  constructor(public http: Http) {
    super();
  }

  public create = (type: string, bikeRackId: number, bikeId: number) => {
    let status = { type: type, bike_rack_id: bikeRackId, bike_id: bikeId };
    let statusString = JSON.stringify({status: status});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.url + '/api/statuses', statusString, {headers: headers})
      .map(res => res.json());
  }

  public checkIn = (bikeRackId: number, bikeId?: number) => {
    return this.create('CheckInStatus', bikeRackId, bikeId);
  }

  public checkOut = (bikeRackId: number, bikeId?: number) => {
    return this.create('CheckOutStatus', bikeRackId, bikeId);
  }

}
