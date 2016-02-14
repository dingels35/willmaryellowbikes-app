import {App, IonicApp, Platform, Config} from 'ionic-framework/ionic';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';
import {provide, Type} from 'angular2/core';
import {Http} from 'angular2/http';

// pages
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {LogInPage} from './pages/log-in/log-in';
import {ListPage} from './pages/list/list';
import {GridPage} from './pages/grid/grid';
import {CheckInPage} from './pages/check-in-out/check-in';
import {CheckOutPage} from './pages/check-in-out/check-out';
import {AdoptRackPage} from './pages/adopt-rack/adopt-rack';

@App({
  templateUrl: 'build/app.html',
  providers: [
    provide(AuthHttp, {
      useFactory: (http) => new AuthHttp(new AuthConfig(), http),
      deps: [Http]
    })
  ],
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

    this.pages = [
      { title: 'Getting Started', component: GettingStartedPage },
      { title: 'Log In', component: LogInPage },
      { title: 'List', component: ListPage },
      { title: 'Grid Icons', component: GridPage },
      { title: 'Check In', component: CheckInPage },
      { title: 'Check Out', component: CheckOutPage },
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
