
import { Component, ViewChild, provide, Type } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Config} from 'ionic-angular';
import {AuthHttp, AuthConfig} from './vendor/angular2-jwt/angular2-jwt';
import { StatusBar } from 'ionic-native';

import { Http } from '@angular/http';

import {AuthorizationService} from './services/authorization-service';
import {GpsService} from './services/gps-service';

// pages
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {LogInPage} from './pages/log-in/log-in';
import {CheckInPage} from './pages/check-in-out/check-in';
import {CheckOutPage} from './pages/check-in-out/check-out';
import {AdoptRackPage} from './pages/adopt-rack/adopt-rack';
import {ReportAbandonedPage} from './pages/report-abandoned/report-abandoned';
import {ReportBrokenPage} from './pages/report-broken/report-broken';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    AuthorizationService,
    GpsService,
    provide(AuthHttp, {
      useFactory: (http) => new AuthHttp(new AuthConfig({noJwtError: true}), http),
      deps: [Http]
    })
  ]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GettingStartedPage;
  private pageMap = {
    'AdoptRackPage': AdoptRackPage,
    'CheckInPage': CheckInPage,
    'CheckOutPage': CheckOutPage,
    'GettingStartedPage': GettingStartedPage,
    'ReportAbandonedPage': ReportAbandonedPage,
    'ReportBrokenPage': ReportBrokenPage,
    'LogInPage': LogInPage
  }

  constructor(public platform: Platform, public authorizationService: AuthorizationService, public gpsService: GpsService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // console.log('Platform ready');

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    let p = this.pageMap[page.component];
    this.nav.push(p);
  }
}

ionicBootstrap(MyApp);
