import {Geolocation} from 'ionic-native';

export class GpsService {
  public latitude: number;
  public longitude: number;
  public promise;

  constructor() {
    let svc = this;
    this.promise = Geolocation.getCurrentPosition().then(
      pos => {
        svc.latitude = pos.coords.latitude;
        svc.longitude = pos.coords.longitude;
      }
    );


  }


}
