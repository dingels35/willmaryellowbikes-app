import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {CalendarPipe} from '../../vendor/angular2-moment/CalendarPipe';
import {NavController, AlertController} from 'ionic-angular';

import {BikeRackSelect} from '../../components/bike-rack-select';
import {WybNavbar} from '../../components/wyb-navbar';
import {Status} from '../../models/status'
import {StatusService} from '../../services/status-service'

@Component({
  templateUrl: 'build/pages/adopt-rack/adopt-rack.html',
  providers: [StatusService],
  directives: [BikeRackSelect, WybNavbar],
  pipes: [CalendarPipe]
})
export class AdoptRackPage {
  // services
  nav: NavController;
  statusService: StatusService;
  cdr: ChangeDetectorRef;
  alertController: AlertController;

  // form elements
  frm: ControlGroup;

  // status variables
  isSubmitting: boolean;
  isSuccessful: boolean;

  // status history
  statusHistory: Status[];
  statusHistoryBikeRackId: number;
  statusHistoryLoading: boolean;

  constructor(nav: NavController, fb: FormBuilder, ss:StatusService, cdr: ChangeDetectorRef, ac: AlertController) {
    // save instances to object
    this.nav = nav;
    this.statusService = ss;
    this.cdr = cdr;
    this.alertController = ac;

    // initialize variables
    this.isSubmitting = false;
    this.isSuccessful = false;

    // set up form
    this.frm = fb.group({
      bikeRackId: [null, Validators.required],
      bikeCount: [null, Validators.required]
    });

    console.log("this hodul show up");
    this.frm.controls['bikeRackId'].valueChanges.subscribe(data => {
      console.log("aldfjafjadf");
      console.log(data);
    });
    this.frm.valueChanges.subscribe(data => {
      console.log("XXXXXX");
      console.log(data);
    });

  }


  close(event) {
    this.nav.pop();
  }

  save(event) {
    event.preventDefault();

    // show alert if errors exist
    if (!this.frm.valid) {
      if (this.bikeRackIdErrors()['required']) {
        this.showError('You must select a bike rack.');
      }
      if (this.bikeCountErrors()['required']) {
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
      t.statusHistory.unshift(resp);
    }
    function error(err, t) {
     t.showError("There was an error submitting your request.");
     fin(t);
    }
    function fin(t) {
      t.isSubmitting = false;
    }
  }

  bikeCountErrors() {
    return this.frm.controls['bikeCount'].errors || {};
  }

  bikeRackIdErrors() {
    return this.frm.controls['bikeRackId'].errors || {};
  }

  getRackHistory(rackId: number) {
    console.log("getRackHistory()!!");
    this.statusHistory = null;
    this.statusHistoryLoading = true;
    this.statusService.bikeCountHistory(rackId).subscribe(
      resp => success(resp, this),
      err => error(err, this),
      () => fin(this)
    );
    this.cdr.detectChanges(); // not sure why this is necessary, but it is to prevent this error: http://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked

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
    console.log('onBikeRackIdChange');
    if (this.frm.controls['bikeRackId'].value && this.frm.controls['bikeRackId'].value != this.statusHistoryBikeRackId  ) {
      this.statusHistoryBikeRackId = this.frm.controls['bikeRackId'].value
      this.getRackHistory(this.statusHistoryBikeRackId);
    }

  }

  showError(message: string) {
    let alert = this.alertController.create({
      title: 'Validation error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present(alert);
  }



}
