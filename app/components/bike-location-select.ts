import {Component, Input} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Select, Item, Label, Option} from 'ionic-angular';

@Component({
  selector: 'bike-location-select',
  directives: [Select, Item, Label, Option],
  template: `
    <ion-item>
      <ion-label>* Where is the bike?</ion-label>
      <ion-select [(ngModel)]="_value" (change)='onChange(value)'>
        <ion-option *ngFor='#l of locations' [value]='l.value'>{{ l.text }}</ion-option>
      </ion-select>
    </ion-item>
  `
})
export class BikeLocationSelect {
  locations: Array<{}>;

  protected _value: number;
  @Input()
  get value() { return this._value; }
  set value(val) { this._value = val; this.onChange(val); }

  constructor(ngControl: NgControl) {

    if (ngControl) { ngControl.valueAccessor = this; }

    this.locations = [
      // { value: 'inarack',          text: 'In a rack' },
      { value: 'mylocation',    text: 'My location (via GPS)' },
      { value: 'somewhereelse', text: 'Somewhere else' }
    ];

  }

  private hasValue() { return (this.value) ? true : false; }


  // functions to implement ngControl
  onChange(val) {}
  onTouched(val) {}
  writeValue(val) { this._value = val; }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}
