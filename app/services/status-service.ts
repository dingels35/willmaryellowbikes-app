import {Injectable} from '@angular/core';
import {Headers, URLSearchParams, RequestOptionsArgs} from '@angular/http';
import {AuthHttp} from '../vendor/angular2-jwt/angular2-jwt';
import {BaseService} from './base-service';
import {Status} from '../models/status';
import 'rxjs/add/operator/map';


@Injectable()
export class StatusService extends BaseService {

  constructor(public http: AuthHttp) {
    super();
  }

  // public create = (type: string, bikeRackId: number, bikeId: number) => {
  public create = (status: Status) => {
    let statusString = JSON.stringify({status: status});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.url + 'statuses', statusString, {headers: headers})
      .map(res => res.json());
  }

  private where = (qs: any) => {
    let headers = new Headers({'Content-Type': 'application/json'});
    // let params = new URLSearchParams();
    // for (var key in qs) {
    //   params.set(key, qs[key]);
    // }


    return this.http.get(this.url + 'statuses', { headers: headers, search: qs })
      .map(res => res.json().statuses)
      .map((statuses: Array<any>) => {
        let result:Array<Status> = [];
        if (statuses) {
          statuses.forEach((obj) => {
            result.push(new Status(obj));
          });
        }
        return result;
      });
  }

  public checkIn = (bikeRackId: number, bikeId?: number) => {
    let status = new Status({ type: 'CheckInStatus', bike_rack_id: bikeRackId, bike_id: bikeId });
    return this.create(status);
  }

  public checkOut = (bikeRackId: number, bikeId?: number) => {
    let status = new Status({ type: 'CheckOutStatus', bike_rack_id: bikeRackId, bike_id: bikeId });
    return this.create(status);
  }

  public bikeCount = (bikeRackId: number, bikeCount: number) => {
    let status = new Status({ type: 'BikeCountStatus', bike_rack_id: bikeRackId, bike_count: bikeCount });
    return this.create(status);
  }

  public bikeCountHistory = (bikeRackId: number) => {
    return this.where({ bike_rack_id: bikeRackId, limit: 10, scope: 'bike_count' })
  }

  public reportAbandoned = (bikeId?: number, locationDescription?: string, latitude?: number, longitude?: number) => {
    let status = new Status({type: 'AbandonedStatus', bike_id: bikeId, location_description: locationDescription, latitude: latitude, longitude: longitude});
    return this.create(status);
  }
  public reportBroken = (bikeRackId: number, bikeId: number, brokenDescription: string) => {
    let status = new Status({type: 'BrokenStatus', bike_rack_id: bikeRackId, bike_id: bikeId, broken_description: brokenDescription});
    return this.create(status);
  }

}
