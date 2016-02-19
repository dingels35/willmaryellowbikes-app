import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Page} from 'ionic-framework/ionic';
import {WybNavbar} from '../../components/wyb-navbar';
import {AuthorizationService} from '../../services/authorization-service'

@Page({
  templateUrl: 'build/pages/log-in/log-in.html',
  prividers: [AuthorizationService],
  directives: [WybNavbar]
})
export class LogInPage {
  lock: Auth0Lock = new Auth0Lock('nlCX5QpwjRbWT5ATwDigu0kwsTikjha0', 'willmaryellowbikes.auth0.com');

  constructor(public auth: AuthorizationService) { }

  logIn() {
    let auth = this.auth; // need to reference this inside callback funtion

    this.lock.show(function(err, profile, id_token) {
      if(err) {
        throw new Error(err);
      }

      console.log("Logged In Successfully");
      console.log(profile);
      console.log(id_token);

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      auth.setActivePages();

      // TODO: show a thank you for logging in page

    });
  }

}
