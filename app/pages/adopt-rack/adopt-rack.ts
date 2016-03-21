import {Page} from 'ionic-angular';
import {WybNavbar} from '../../components/wyb-navbar';
import {NavController, Alert} from 'ionic-angular';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {StatusService} from '../../services/status-service'
import {BikeRackSelect} from '../../components/bike-rack-select';
import {Status} from '../../models/status'

@Page({
  templateUrl: 'build/pages/adopt-rack/adopt-rack.html',
  providers: [StatusService],
  directives: [BikeRackSelect, WybNavbar]
})
export class AdoptRackPage {
  // services
  nav: NavController;
  statusService: StatusService;

  // form elements
  frm: ControlGroup;

  // status variables
  isSubmitting: boolean;
  isSuccessful: boolean;

  // status history
  statusHistory: Status[];
  statusHistoryBikeRackId: number;
  statusHistoryLoading: boolean;

  constructor(nav: NavController, fb: FormBuilder, ss:StatusService) {
    // save instances to object
    this.nav = nav;
    this.statusService = ss;

    // initialize variables
    this.isSubmitting = false;
    this.isSuccessful = false;

    // set up form
    this.frm = fb.group({
      bikeRackId: [null, Validators.required],
      bikeCount: [null, Validators.required]
    });
  }


  close(event) {
    this.nav.pop();
  }

  save(event) {
    event.preventDefault();

    // show alert if errors exist
    if (!this.frm.valid) {
      if (this.bikeRackIdErrors().required) {
        this.showError('You must select a bike rack.');
      }
      if (this.numBikesErrors().required) {
        this.showError('You must enter the number of bikes.');
      }
      return;
    }

    // assert no errors.  submit form results
    return this.doAdoptRack();
  }

  //////// helper functions ////////

  doAdoptRack() {
    if (this.isSubmitting) { return; }
    this.isSubmitting = true;

    this.statusService.bikeCount(this.frm.value.bikeRackId, this.frm.value.bikeCount)
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

  bikeRackIdErrors() {
    return this.frm.controls.bikeRackId.errors || {};
  }


  getRackHistory(rackId: number) {
    // this.statusHistory = null;
    this.statusHistoryLoading = true;
    this.statusService.bikeCountHistory(rackId).subscribe(
      resp => success(resp, this),
      err => error(err, this),
      () => fin(this)
    );

    function success(resp, t) {
      t.statusHistory = resp;
    }
    function error (err, t) {
      // TODO: something better
      console.log(error);
    }
    function fin(t) {
      t.statusHistoryLoading = false;
    }
  }

  onBikeRackIdChange() {
    if (this.frm.controls.bikeRackId.value && this.frm.controls.bikeRackId.value != this.statusHistoryBikeRackId  ) {
      console.log("onBikeRackIdChange", this.frm.controls.bikeRackId.value);
      this.statusHistoryBikeRackId = this.frm.controls.bikeRackId.value
      this.getRackHistory(this.statusHistoryBikeRackId);
    }

  }

  numBikesErrors() {
    this.statusHistoryBikeRackId
    return this.frm.controls.numBikes.errors || {};
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
