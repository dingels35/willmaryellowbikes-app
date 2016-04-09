import {Geolocation} from 'ionic-native';

export class GpsService {
  public latitude: number;
  public longitude: number;
  public hasLocation: boolean;
  public promise;

  constructor() {
    let svc = this;
    this.hasLocation = false;
    this.promise = Geolocation.getCurrentPosition().then(
      pos => {
        svc.hasLocation = true;
        svc.latitude = pos.coords.latitude;
        svc.longitude = pos.coords.longitude;
      },
      err => {
        svc.hasLocation = false;
      }
    );


  }


}
