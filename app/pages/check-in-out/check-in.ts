import {Page, NavController} from 'ionic-angular';
import {FormBuilder} from 'angular2/common';
import {StatusService} from '../../services/status-service'
import {CheckInOutPage} from './check-in-out';
import {BikeRackSelect} from '../../components/bike-rack-select';
import {BikeSelect} from '../../components/bike-select';
import {WybNavbar} from '../../components/wyb-navbar';

@Page({
  templateUrl: 'build/pages/check-in-out/check-in-out.html',
  providers: [StatusService],
  directives: [BikeRackSelect, BikeSelect, WybNavbar]
})
export class CheckInPage extends CheckInOutPage {
  constructor(nav: NavController, fb: FormBuilder, ss:StatusService) {
    super(nav, fb, ss);
    this.type = 'CheckInStatus';
  }
}
