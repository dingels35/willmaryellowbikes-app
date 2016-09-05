import {Component, Input} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';


@Component({
  selector: 'wyb-page-icon',
  providers: [],
  directives: [IONIC_DIRECTIVES],
  template: `
    <ion-card class='page-icon'>
      <ion-card-content style="text-align: center;">
        <a class='icon-link'>
          <i class="wybicon {{ icon }}" style='font-size: 20vw;'></i>
          <br /><br />
          <ng-content></ng-content>
        </a>
      </ion-card-content>
    </ion-card>
  `
})
export class WybPageIcon {
  @Input() icon: string;

  constructor() {

  }
}