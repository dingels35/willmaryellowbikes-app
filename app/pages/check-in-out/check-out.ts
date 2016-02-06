import {Page, NavController} from 'ionic-framework/ionic';
import {FormBuilder} from 'angular2/common';
import {BikeRackService} from '../../services/bike-rack-service';
import {BikeService} from '../../services/bike-service';
import {StatusService} from '../../services/status-service'
import {CheckInOutPage} from './check-in-out';
import {BikeRackSelect} from '../../components/bike-rack-select';

@Page({
  templateUrl: '/build/pages/check-in-out/check-in-out.html',
  providers: [BikeService, BikeRackService, StatusService],
  directives: [BikeRackSelect]
})
export class CheckOutPage extends CheckInOutPage {
  constructor(nav: NavController, bs: BikeService, brs: BikeRackService, fb: FormBuilder, ss:StatusService) {
    super(nav, bs, brs, fb, ss);
    this.type = 'CheckOutStatus';
  }
}
