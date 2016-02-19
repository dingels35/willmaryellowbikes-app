import {Page, NavController} from 'ionic-framework/ionic';
import {FormBuilder} from 'angular2/common';
import {StatusService} from '../../services/status-service'
import {CheckInOutPage} from './check-in-out';
import {BikeRackSelect} from '../../components/bike-rack-select';
import {BikeSelect} from '../../components/bike-select';
import {WybMenu} from '../../components/wyb-menu';
import {JwtHelper} from 'angular2-jwt';

@Page({
  templateUrl: '/build/pages/check-in-out/check-in-out.html',
  providers: [StatusService, JwtHelper],
  directives: [BikeRackSelect, BikeSelect, WybMenu]
})
export class CheckOutPage extends CheckInOutPage {
  constructor(nav: NavController, fb: FormBuilder, ss:StatusService, x:JwtHelper) {
    debugger;
    super(nav, fb, ss);
    this.type = 'CheckOutStatus';
  }
}
