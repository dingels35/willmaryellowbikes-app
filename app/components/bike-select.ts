import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select, Item, Label, Option} from 'ionic-angular';
import {BikeService} from '../services/bike-service';
import {Bike} from '../models/bike';

@Component({
  selector: 'bike-select',
  directives: [Select, Item, Label, Option],
  providers: [
    BikeService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BikeSelect),
      multi: true
    }
  ],
  template: `
    <ion-item>
      <ion-label>Select a bike</ion-label>
      <ion-select [(ngModel)]="value" (change)='onChange(value)'>
        <ion-option *ngFor='let b of bikes' [value]='b.id'>{{b.identifier}}</ion-option>
      </ion-select>
    </ion-item>
  `
})
export class BikeSelect implements ControlValueAccessor {
  bikes: Array<Bike>;
  bikeService: BikeService;

  protected _value: number;
  @Input()
  get value() { console.log("get", this._value); return this._value; }
  set value(val) { this._value = val; this.onChange(val); console.log("set", val); }

  constructor(bs: BikeService) {
    this.bikeService = bs;
    this.loadBikes();
  }

  private loadBikes()  {
    this.bikeService.all().subscribe(res => this.bikes = res);
  }

  // functions to implement ControlValueAccessor
  onChange(val) {}
  onTouched(val) {}
  writeValue(val) { this._value = val; }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}