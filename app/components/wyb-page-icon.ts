import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';


@Component({
  selector: 'wyb-page-icon',
  providers: [],
  directives: [IONIC_DIRECTIVES],
  template: `
    <ion-card class='page-icon'>
      <ion-card-content style="text-align: center;">
        <i class="wybicon {{ icon }}" style='font-size: 20vw;'></i>
        <br /><br />
        <ng-content></ng-content>
      </ion-card-content>
    </ion-card>
  `
})
export class WybPageIcon {
  @Input() icon: string;

  constructor() {

  }
}