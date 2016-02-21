import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Page, NavController} from 'ionic-framework/ionic';
import {WybNavbar} from '../../components/wyb-navbar';
import {AuthorizationService} from '../../services/authorization-service'
import {GettingStartedPage} from '../getting-started/getting-started';

@Page({
  templateUrl: 'build/pages/log-in/log-in.html',
  prividers: [AuthorizationService],
  directives: [WybNavbar]
})
export class LogInPage {
  lock: Auth0Lock = new Auth0Lock('nlCX5QpwjRbWT5ATwDigu0kwsTikjha0', 'willmaryellowbikes.auth0.com');
  public hasLoggedIn: boolean = false;

  constructor(public auth: AuthorizationService, public nav: NavController) { }

  goHome() {
    this.nav.setRoot(GettingStartedPage);
  }

  logIn() {
    let vm = this;

    this.lock.show(function(err, profile, id_token) {
      if(err) {
        // TODO: show an error message
        throw new Error(err);
      }

      console.log("Logged In Successfully");
      console.log(profile);
      console.log(id_token);

      // save creds
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      vm.auth.setActivePages();

      // show thank you
      vm.hasLoggedIn = true;     

    });
  }

}
