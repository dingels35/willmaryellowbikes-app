import {Page, NavController} from 'ionic-framework/ionic';
import {WybNavbar} from '../../components/wyb-navbar';

@Page({
  templateUrl: 'build/pages/report-broken/report-broken.html',
  directives: [WybNavbar]
})
export class ReportBrokenPage {
  constructor(nav: NavController) {
  }
}
