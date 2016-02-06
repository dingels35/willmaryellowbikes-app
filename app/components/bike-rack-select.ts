import {Component, Input} from 'angular2/core';
import {NgControl} from 'angular2/common';
import {Select, Item, Label, Option} from 'ionic-framework/ionic';
import {BikeRackService} from '../services/bike-rack-service';
import {BikeRack} from '../models/bike-rack';

@Component({
  selector: 'bike-rack-select',
  directives: [Select, Item, Label, Option],
  template: `
    <ion-item>
      <ion-label>* Select a bike rack</ion-label>
      <ion-select [(ngModel)]="_value" (change)='onChange(value)'>
        <ion-option *ngFor='#br of bikeRacks' [value]='br.id'>{{br.name}}</ion-option>
      </ion-select>
    </ion-item>
  `
})
export class BikeRackSelect {
  bikeRacks: Array<BikeRack>;

  protected _value: number;
  @Input()
  get value() { return this._value; }
  set value(val) { this._value = val; this.onChange(val); }

  constructor(brs: BikeRackService, ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }

    brs.all().subscribe(res => this.bikeRacks = res);
    brs.closest(45, -95).subscribe(res => this.value = res.id);
  }


  onChange(val) {}
  onTouched(val) {}
  writeValue(val) { this._value = val; }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}