import {Page, NavController} from 'ionic-framework/ionic';
import {WybNavbar} from '../../components/wyb-navbar';

@Page({
  templateUrl: 'build/pages/report-abandoned/report-abandoned.html',
  directives: [WybNavbar]
})
export class ReportAbandonedPage {
  constructor(nav: NavController) {
  }
}
