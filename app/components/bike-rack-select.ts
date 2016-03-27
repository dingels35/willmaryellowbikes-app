import {Component, Input} from 'angular2/core';
import {NgControl} from 'angular2/common';
import {Select, Item, Label, Option} from 'ionic-angular';
import {BikeRackService} from '../services/bike-rack-service';
import {BikeRack} from '../models/bike-rack';

@Component({
  selector: 'bike-rack-select',
  directives: [Select, Item, Label, Option],
  providers: [BikeRackService],
  template: `
    <ion-item>
      <ion-label>* {{ label }}</ion-label>
      <ion-select [(ngModel)]="_value" (change)='onChange(value)' [disabled]='isLoadingBikeRacks || isLoadingNearest'>
        <ion-option *ngFor='#br of bikeRacks' [value]='br.id'>{{br.name}}</ion-option>
      </ion-select>
    </ion-item>
  `
})
export class BikeRackSelect {
  bikeRacks: Array<BikeRack>;
  bikeRackService: BikeRackService;
  public isLoadingBikeRacks: boolean;
  public isLoadingNearest: boolean;
  label: string;

  protected _value: number;
  @Input()
  get value() { return this._value; }
  set value(val) { this._value = val; this.onChange(val); }

  constructor(brs: BikeRackService, ngControl: NgControl) {
    if (ngControl) { ngControl.valueAccessor = this; }

    this.bikeRackService = brs;
    this.loadBikeRacks();
    this.setByGeoLocation();
    this.setLabel();
  }

  private hasValue() { return (this.value) ? true : false; }

  private loadBikeRacks()  {
    this.isLoadingBikeRacks = true;
    this.bikeRackService.all().subscribe(res => {
      this.bikeRacks = res;
      this.isLoadingBikeRacks = false;
      this.setLabel();
    });
  }

  private setByGeoLocation() {
    this.isLoadingNearest = true;
    navigator.geolocation.getCurrentPosition((position) => {
      if (!this.hasValue()) {
        this.bikeRackService.closest(position.coords.latitude, position.coords.longitude).subscribe((res) => {
          if (!this.hasValue()) this.value = res.id;
          this.isLoadingNearest = false;
          this.setLabel();
        });
      } else {
        this.isLoadingNearest = false;
        this.setLabel();
      }
    });
  }

  private setLabel() {
    if (this.isLoadingBikeRacks) {
      this.label = 'Loading bike racks ...';
    } else if (this.isLoadingNearest) {
      this.label = 'Finding nearest bike rack ...';
    } else {
      this.label = 'Select a bike rack';
    }
  }

  // functions to implement ngControl
  onChange(val) {}
  onTouched(val) {}
  writeValue(val) { this._value = val; }
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

}
