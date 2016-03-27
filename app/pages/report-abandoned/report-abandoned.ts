import {Page, NavController} from 'ionic-angular';
import {WybNavbar} from '../../components/wyb-navbar';

@Page({
  templateUrl: 'build/pages/report-abandoned/report-abandoned.html',
  directives: [WybNavbar]
})
export class ReportAbandonedPage {
  constructor(nav: NavController) {
  }
}
