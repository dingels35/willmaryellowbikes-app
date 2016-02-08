import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Page, NavController} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'build/pages/log-in/log-in.html'
})
export class LogInPage {
  lock: Auth0Lock = new Auth0Lock('nlCX5QpwjRbWT5ATwDigu0kwsTikjha0', 'willmaryellowbikes.auth0.com');

  constructor(nav: NavController) {

  }

  logIn() {
    this.lock.show(function(err, profile, id_token) {

      if(err) {
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

      console.log("Logged In Successfully");
      console.log(profile);
      console.log(id_token);

    });
  }

}
