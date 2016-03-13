import {Page, NavController} from 'ionic-angular';
import {WybNavbar} from '../../components/wyb-navbar';

@Page({
  templateUrl: 'build/pages/report-broken/report-broken.html',
  directives: [WybNavbar]
})
export class ReportBrokenPage {
  constructor(nav: NavController) {
  }
}
