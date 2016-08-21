import {Page, NavController, Alert} from 'ionic-angular';
import {WybNavbar} from '../../../components/wyb-navbar';
import {BikeService} from '../../../services/bike-service';
import {Bike} from '../../../models/bike';
import * as _ from 'lodash';

@Page({
  templateUrl: 'build/pages/admin/bikes/bikes.html',
  providers: [BikeService],
  directives: [WybNavbar]
})
export class AdminBikesPage {
  nav: NavController;
  bikeService: BikeService;
  bikes: Array<Bike>;

  constructor(nav: NavController, bs: BikeService) {
    // save instances to object
    this.nav = nav;
    this.bikeService = bs;

    // initialize variables
    this.loadBikes();
  }

  private loadBikes()  {
    let _this = this;
    this.bikeService.all().subscribe(res => assignBikes(res));

    function assignBikes (bikes) {
      console.log("hi");
      _this.bikes = _.sortBy(bikes, 'identifier');
    }
  }

  close(event) {
    this.nav.pop();
  }

  //////// helper functions ////////


}
