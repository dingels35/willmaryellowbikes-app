import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-framework/ionic';


@Component({
  selector: 'wyb-navbar',
  providers: [],
  directives: [IONIC_DIRECTIVES],
  template: `
  <ion-navbar *navbar>
    <button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    <ion-title><ng-content></ng-content></ion-title>
  </ion-navbar>
  `
})
export class WybNavbar {
  constructor() {
  }
}