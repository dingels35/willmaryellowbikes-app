import {Page, NavController} from 'ionic-framework/ionic';
import {WybNavbar} from '../../components/wyb-navbar';


@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html',
  directives: [WybNavbar]
})
export class GettingStartedPage {

  constructor(nav: NavController) {

  }

}
