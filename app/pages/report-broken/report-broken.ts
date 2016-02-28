import {Page, NavController, Alert} from 'ionic-framework/ionic';

import {FormBuilder, Validators, ControlGroup} from 'angular2/common';

import {StatusService} from '../../services/status-service'
import {Status} from '../../models/status';

import {GettingStartedPage} from '../getting-started/getting-started';
import {ReportAbandonedPage} from '../report-abandoned/report-abandoned';

import {BikeRackSelect} from '../../components/bike-rack-select';
import {BikeSelect} from '../../components/bike-select';

@Page({
  templateUrl: 'build/pages/report-broken/report-broken.html',
  providers: [StatusService],
  directives: [BikeRackSelect, BikeSelect]
})
export class ReportBrokenPage {
  // services
  nav: NavController;
  statusService: StatusService;

  // drop down options
  bikes: Array<Bike>;

  // form elements
  frm: ControlGroup;

  // status variables
  isSubmitting: boolean;
  isSuccessful: boolean;

  reportAbandonedPage: ReportAbandonedPage;

  constructor(nav: NavController, fb: FormBuilder, ss:StatusService) {
    // save instances to object
    this.nav = nav;
    this.statusService = ss;

    this.reportAbandonedPage = ReportAbandonedPage;

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
    return this.doReportBroken();
  }


  //////// helper functions ////////

  doReportBroken() {
    if (this.isSubmitting) { return; }
    this.isSubmitting = true;

console.log("report broken, rack="+this.frm.value.bikeRackId+", id="+this.frm.value.bikeId+", description="+this.frm.value.brokenDescription);

    this.reportBrokenFunction()(this.frm.value.bikeRackId, this.frm.value.bikeId, this.frm.value.brokenDescription)
      .subscribe(
        resp => success(resp, this),
        err => error(err, this),
        () => fin(this)
      );

    // callbacks
    function success(resp, t) {
      t.isSuccessful = true;
fin(t); // is this call needed?
    }
    function error(err, t) {
console.log("Submission error:");console.log(err);
      t.showError("There was an error submitting your request.");
      fin(t);
    }
    function fin(t) {
      t.isSubmitting = false;
console.log("fin!");
    }
  }

  reportBrokenFunction() {
    return this.statusService.reportBroken;
  }

  bikeRackIdErrors(): {} {
    return this.frm.controls.bikeRackId.errors || {};
  }

  brokenErrors(): {} {
    return this.frm.controls.broken.errors || {};
  }

  showError(message: string) {
    let alert = Alert.create({
      title: 'Validation error',
      subTitle: message,
      buttons: ['Close']
    });
    this.nav.present(alert);
  }

  goTo(page) {
    this.nav.push(page);
  }
}
