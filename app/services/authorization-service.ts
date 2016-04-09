import {tokenNotExpired} from '../vendor/angular2-jwt/angular2-jwt';

export class AuthorizationService {
  private pages: Array<{title: string, component: string, icon: string}>;
  private adminPages: Array<{title: string, component: string, icon: string}>;
  private preLoginPages: Array<{title: string, component: string, icon: string}>;
  public activePages: Array<{title: string, component: string, icon: string}>;


  constructor() {
    this.pages = [
      // { title: 'Home',              component: 'GettingStartedPage' },
      { title: 'Check Out',         component: 'CheckOutPage',        icon: 'wybicon-man-riding-a-bicycle' },
      { title: 'Check In',          component: 'CheckInPage',         icon: 'wybicon-time-for-bicycle-exercise' },
      { title: 'Report Abandoned',  component: 'ReportAbandonedPage', icon: 'wybicon-bicycle-pin' },
      { title: 'Report Broken',     component: 'ReportBrokenPage',    icon: 'wybicon-bicycle-sprockets' },
      { title: 'Adopt a Rack',      component: 'AdoptRackPage',       icon: 'wybicon-bicycle-parked' }
    ];
    this.preLoginPages = [
      // { title: 'Log In',            component: 'LogInPage',           icon: 'wybicon-cyclist-helmet' },
    ]

    this.setActivePages();
  }

  public isAuthenticated() {
    return tokenNotExpired();
  }

  public setActivePages() {
    this.activePages = this.pages;
    if (!this.isAuthenticated()) {
      this.activePages = this.activePages.concat(this.preLoginPages);
    }
  }

  public toJSON() {
    return JSON.stringify(this.activePages);
  }

}
