import {Page, NavController} from 'ionic-framework/ionic';
import {WybMenu} from '../../components/wyb-menu';


@Page({
  templateUrl: 'build/pages/getting-started/getting-started.html',
  directives: [WybMenu]
})
export class GettingStartedPage {

  constructor(nav: NavController) {

  }

}
