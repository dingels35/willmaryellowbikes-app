import {NavController, Alert} from 'ionic-framework/ionic';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {BikeRackService} from '../../services/bike-rack-service';
import {BikeRack} from '../../models/bike-rack';
import {BikeService} from '../../services/bike-service';
import {Bike} from '../../models/bike';
import {StatusService} from '../../services/status-service'
import {Status} from '../../models/status';
import {GettingStartedPage} from '../getting-started/getting-started';

import "./check-in-out.scss";

export class CheckInOutPage {
  // services
  nav: NavController;
  statusService: StatusService;

  // drop down options
  bikes: Array<Bike>;
  bikeRacks: Array<BikeRack>;

  // form elements
  frm: ControlGroup;

  // status variables
  isSubmitting: boolean;
  isSuccessful: boolean;
  type: string;

  constructor(nav: NavController, bs: BikeService, brs: BikeRackService, fb: FormBuilder, ss:StatusService) {
    // save instances to object
    this.nav = nav;
    this.statusService = ss;

    // initialize variables
    this.isSubmitting = false;
    this.isSuccessful = false;

    // get bikes and bike racks
    brs.all().subscribe(res => this.bikeRacks = res);
    bs.all().subscribe(res => this.bikes = res);

    // set up form
    this.frm = fb.group({
      bikeId: [null],
      bikeRackId: [null, Validators.required]
    });

  }

  // public functions
  typeText() {
    return this.type.replace(/Check|Status/g,'');
  }

  close(event) {
    this.nav.setRoot(GettingStartedPage);
  }

  save(event) {
    event.preventDefault();

    // show alert if errors exist
    if (!this.frm.valid) {
      if (this.bikeRackIdErrors().required) {
        this.showError('You must select a bike rack.');
      }
      return;
    }

    // assert no errors.  submit form results
    return this.doCheckInOut();
  }



  //////// helper functions ////////

  doCheckInOut() {
    if (this.isSubmitting) { return; }
    this.isSubmitting = true;

    this.checkInOutFunction()(this.frm.value.bikeRackId, this.frm.value.bikeId)
    // this.statusService.create('CheckInStatus',this.frm.value.bikeRackId, this.frm.value.bikeId)
      .subscribe(
        resp => success(resp, this),
        err => error(err, this),
        () => fin(this)
      );

    // call backs
    function success(resp, t) {
      t.isSuccessful = true;
    }
    function error(err, t) {
     t.showError("There was an error submitting your request.");
     fin(t);
    }
    function fin(t) {
      t.isSubmitting = false;
    }
  }

  checkInOutFunction() {
    if (this.type === 'CheckInStatus') return this.statusService.checkIn;
    if (this.type === 'CheckOutStatus') return this.statusService.checkOut;
  }

  bikeRackIdErrors(): {} {
    return this.frm.controls.bikeRackId.errors || {};
  }

  inOrOutErrors(): {} {
    return this.frm.controls.inOrOut.errors || {};
  }

  showError(message: string) {
    let alert = Alert.create({
      title: 'Validation error',
      subTitle: message,
      buttons: ['Close']
    });
    this.nav.present(alert);
  }

}
