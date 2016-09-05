import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import { NavController, AlertController} from 'ionic-angular';
import { Component } from '@angular/core';

import {BikeRackSelect} from '../../components/bike-rack-select';
import {BikeSelect} from '../../components/bike-select';
import {Status} from '../../models/status';
import {StatusService} from '../../services/status-service'
import {WybNavbar} from '../../components/wyb-navbar';
import {ReportAbandonedPage} from '../report-abandoned/report-abandoned';


@Component({
  templateUrl: 'build/pages/report-broken/report-broken.html',
  providers: [StatusService, ReportAbandonedPage],
  directives: [BikeRackSelect, BikeSelect, WybNavbar]
})
export class ReportBrokenPage {
  // services
  nav: NavController;
  statusService: StatusService;
  alertController: AlertController

  // form elements
  frm: ControlGroup;

  // status variables
  isSubmitting: boolean;
  isSuccessful: boolean;

  reportAbandonedPage: ReportAbandonedPage;

  constructor(nav: NavController, fb: FormBuilder, ss:StatusService, ac:AlertController, rap: ReportAbandonedPage) {
    // save instances to object
    this.nav = nav;
    this.statusService = ss;
    this.alertController= ac;

    this.reportAbandonedPage = rap;

    // initialize variables
    this.isSubmitting = false;
    this.isSuccessful = false;

    // set up form
    this.frm = fb.group({
      bikeId: [null],
      bikeRackId: [null, Validators.required],
      brokenDescription: [null]
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
      return;
    }

    // assert no errors.  submit form results
    return this.doReportBroken();
  }

  //////// helper functions ////////

  doReportBroken() {
    if (this.isSubmitting) { return; }
    this.isSubmitting = true;

    this.statusService.reportBroken(this.frm.value.bikeRackId, this.frm.value.bikeId, this.frm.value.brokenDescription)
      .subscribe(
        resp => success(resp, this),
        err => error(err, this),
        () => fin(this)
      );

    // callbacks
    function success(resp, t) {
      t.isSuccessful = true;
    }
    function error(err, t) {
      t.showError("There was an error submitting your request.");
    }
    function fin(t) {
      t.isSubmitting = false;
    }
  }

  bikeRackIdErrors() {
    return this.frm.controls['bikeRackId'].errors || {};
  }

  brokenErrors() {
    return this.frm.controls['broken'].errors || {};
  }

  showError(message: string) {
    let alert = this.alertController.create({
      title: 'Validation error',
      subTitle: message,
      buttons: ['Close']
    });
    alert.present();
  }

  goTo(page) {
    this.nav.push(page);
  }
}
