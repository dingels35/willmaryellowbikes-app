import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select, Item, Label, Option} from 'ionic-angular';

@Component({
  selector: 'bike-location-select',
  directives: [Select, Item, Label, Option],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BikeLocationSelect),
      multi: true
    }
  ],
  template: `
    <ion-item>
      <ion-label>* Where is the bike?</ion-label>
      <ion-select [(ngModel)]="value" (change)='onChange(value)'>
        <ion-option *ngFor='let l of locations' [value]='l.value'>{{ l.text }}</ion-option>
      </ion-select>
    </ion-item>
  `
})
export class BikeLocationSelect implements ControlValueAccessor  {
  locations: Array<{}>;

  protected _value: string;
  @Input()
  get value() { console.log("get2", this._value); return this._value; }
  set value(val) { this._value = val; this.onChange(val); console.log("set2", val); }

  constructor() {

    this.locations = [
      // { value: 'inarack',          text: 'In a rack' },
      { value: 'mylocation',    text: 'My location (via GPS)' },
      { value: 'somewhereelse', text: 'Somewhere else' }
    ];

  }

  // private hasValue() { return (this.value) ? true : false; }

  // functions to implement ControlValueAccessor
  private onChange(val) {}
  private onTouched(val) {}
  writeValue(val) { this._value = val; }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}
