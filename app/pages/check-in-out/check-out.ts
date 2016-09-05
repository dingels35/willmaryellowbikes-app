import {NavController, AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import {FormBuilder} from '@angular/common';
import {StatusService} from '../../services/status-service'
import {CheckInOutPage} from './check-in-out';
import {BikeRackSelect} from '../../components/bike-rack-select';
import {BikeSelect} from '../../components/bike-select';
import {WybNavbar} from '../../components/wyb-navbar';

@Component({
  templateUrl: 'build/pages/check-in-out/check-in-out.html',
  providers: [StatusService],
  directives: [BikeRackSelect, BikeSelect, WybNavbar]
})
export class CheckOutPage extends CheckInOutPage {
  constructor(nav: NavController, fb: FormBuilder, ss:StatusService, ac: AlertController) {
    super(nav, fb, ss, ac);
    this.type = 'CheckOutStatus';
  }
}
