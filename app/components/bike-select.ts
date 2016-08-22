import {Component, Input} from '@angular/core';
import {NgControl} from '@angular/common';
import {Select, Item, Label, Option} from 'ionic-angular';
import {BikeService} from '../services/bike-service';
import {Bike} from '../models/bike';

@Component({
  selector: 'bike-select',
  directives: [Select, Item, Label, Option],
  providers: [BikeService],
  template: `
    <ion-item>
      <ion-label>Select a bike</ion-label>
      <ion-select [(ngModel)]="_value" (change)='onChange(value)'>
        <ion-option *ngFor='#b of bikes' [value]='b.id'>{{b.identifier}}</ion-option>
      </ion-select>
    </ion-item>
  `
})
export class BikeSelect {
  bikes: Array<Bike>;
  bikeService: BikeService;

  protected _value: number;
  @Input()
  get value() { return this._value; }
  set value(val) { this._value = val; this.onChange(val); }

  constructor(bs: BikeService, ngControl: NgControl) {
    if (ngControl) { ngControl.valueAccessor = this; }

    this.bikeService = bs;
    this.loadBikes();
  }

  private loadBikes()  {
    this.bikeService.all().subscribe(res => this.bikes = res);
  }

  // functions to implement ngControl
  onChange(val) {}
  onTouched(val) {}
  writeValue(val) { this._value = val; }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}