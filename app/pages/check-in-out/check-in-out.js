import {Page, NavController} from 'ionic/ionic';
import {NgForm} from 'angular2/common';
import {CheckInOutModel} from './check-in-out-model';
import {BikeRackService} from '../../services/bike-rack-service';
import {BikeRack} from '../../models/bike-rack';
// import {View, NgFor} from 'angular2/angular2';

import "./check-in-out.scss";

@Page({
  templateUrl: '/build/pages/check-in-out/check-in-out.html',
  providers: [BikeRackService]
})
export class CheckInOutPage {
  bikeRacks: Array<BikeRack>;
  locationOptions: Array<string>;

  constructor(nav: NavController, bikeRackService: BikeRackService) {
    this.bikeRackService = bikeRackService;
    this.nav = nav;

    this.locationOptions = ['In a rack','My location'];
    this.bikeRackService.all().subscribe(res => this.bikeRacks = res);

    // debugger;
    // this.http.get('http://lvh.me:3000/api/bike_racks').map(res => res.json().bike_racks).subscribe( res => this.bikeRacks = res);



    // getBikeRacks();

// getRandomQuote() {
//   this.http.get('http://localhost:3001/api/random-quote')
//     .map(res => res.text())
//     .subscribe(
//       data => this.randomQuote = data,
//       err => this.logError(err),
//       () => console.log('Random Quote Complete')
//     );
// }

  }


  // function getBikeRacks() {
  // }

  // function success(bikeRacksX) {
  //   debugger
  //   console.log("SUCCESSx2");
  //   console.log(bikeRacksX);
  //   message = 'aldkfjaldkjfladjf;aldkfjadsf';
  //   // debugger
  //   this.bikeRacks = bikeRacksX;
  // }

  // function error(data) {
  //   console.log("ERROR");
  //   console.log(data);
  // }

  // function fin() {
  //   console.log("FINALLY");
  // }



  // model = new CheckInOutModel('x', '', '');


  // submitted = false;
  // onSubmit() { this.submitted = true; }
  // get diagnostic() { return JSON.stringify(this.model); }

  // function doCheckInOut(event) {
  //   console.log(this.checkInOutForm);
  //   event.preventDefault();
  // }
}
