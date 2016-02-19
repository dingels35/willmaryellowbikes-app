import {tokenNotExpired} from 'angular2-jwt';

export class AuthorizationService {
  private pages: Array<{title: string, component: string}>;
  private adminPages: Array<{title: string, component: string}>;
  private preLoginPages: Array<{title: string, component: string}>;
  public activePages: Array<{title: string, component: string}>;


  constructor() {
    this.pages = [
      { title: 'Getting Started', component: 'GettingStartedPage' },
      { title: 'Check In', component: 'CheckInPage' },
      { title: 'Check Out', component: 'CheckOutPage' },
      { title: 'Adopt a Rack', component: 'AdoptRackPage' }
    ];
    this.preLoginPages = [
      { title: 'Log In', component: 'LogInPage' },
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
