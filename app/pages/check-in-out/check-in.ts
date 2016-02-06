import {Page, NavController} from 'ionic-framework/ionic';
import {FormBuilder} from 'angular2/common';
import {BikeService} from '../../services/bike-service';
import {StatusService} from '../../services/status-service'
import {CheckInOutPage} from './check-in-out';
import {BikeRackSelect} from '../../components/bike-rack-select';

@Page({
  templateUrl: '/build/pages/check-in-out/check-in-out.html',
  providers: [BikeService, StatusService],
  directives: [BikeRackSelect]
})
export class CheckInPage extends CheckInOutPage {
  constructor(nav: NavController, bs: BikeService, fb: FormBuilder, ss:StatusService) {
    super(nav, bs, fb, ss);
    this.type = 'CheckInStatus';
  }
}
