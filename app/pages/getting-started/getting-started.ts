import {Page, NavController} from 'ionic-angular';
import {Type} from 'angular2/core';
import {WybNavbar} from '../../components/wyb-navbar';
import {WybPageIcon} from '../../components/wyb-page-icon';

import {AdoptRackPage} from '../adopt-rack/adopt-rack';
import {CheckInPage} from '../check-in-out/check-in';
import {CheckOutPage} from '../check-in-out/check-out';
import {LogInPage} from '../log-in/log-in';
import {ReportAbandonedPage} from '../report-abandoned/report-abandoned';
import {ReportBrokenPage} from '../report-broken/report-broken';

import {AuthorizationService} from '../../services/authorization-service'

@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html',
  providers: [AuthorizationService],
  directives: [WybNavbar, WybPageIcon]
})
export class GettingStartedPage {
  public adoptRackPage: Type;
  public checkInPage: Type;
  public checkOutPage: Type;
  public logInPage: Type;
  public reportAbandonedPage: Type;
  public reportBrokenPage: Type;


  constructor(public nav: NavController, public auth: AuthorizationService) {
    this.adoptRackPage = AdoptRackPage;
    this.checkInPage = CheckInPage;
    this.checkOutPage = CheckOutPage;
    this.logInPage = LogInPage;
    this.reportAbandonedPage = ReportAbandonedPage;
    this.reportBrokenPage = ReportBrokenPage;
  }

  goTo(page) {
    this.nav.push(page);
  }

}
