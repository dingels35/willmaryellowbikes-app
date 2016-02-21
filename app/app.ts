import {App, IonicApp, Platform, Config} from 'ionic-framework/ionic';

import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {GridPage} from './pages/grid/grid';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';
import {CheckInPage} from './pages/check-in-out/check-in';
import {CheckOutPage} from './pages/check-in-out/check-out';
import {AdoptRackPage} from './pages/adopt-rack/adopt-rack';
import {ReportAbandonedPage} from './pages/report-abandoned/report-abandoned';
import {ReportBrokenPage} from './pages/report-broken/report-broken';

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {
    // mode: 'md'
  }
})
class MyApp {
  rootPage: Type = GettingStartedPage;
  pages: Array<{title: string, component: Type}>

  constructor(private app: IonicApp, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'List', component: ListPage },
      { title: 'Grid Icons', component: GridPage },
      { title: 'Check In', component: CheckInPage },
      { title: 'Check Out', component: CheckOutPage },
      { title: 'Report Abandoned', component: ReportAbandonedPage },
      { title: 'Report Broken', component: ReportBrokenPage },
      { title: 'Adopt a Rack', component: AdoptRackPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Platform ready');

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

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
