import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Page, NavController, Alert} from 'ionic-angular';

import {BikeLocationSelect} from '../../components/bike-location-select';
import {BikeSelect} from '../../components/bike-select';
import {GpsService} from '../../services/gps-service';
import {Status} from '../../models/status';
import {StatusService} from '../../services/status-service'
import {WybNavbar} from '../../components/wyb-navbar';

@Page({
  templateUrl: 'build/pages/report-abandoned/report-abandoned.html',
  providers: [StatusService],
  directives: [BikeLocationSelect, BikeSelect, WybNavbar]
})
export class ReportAbandonedPage {
  // services
  gpsService: GpsService;
  nav: NavController;
  statusService: StatusService;

  // form elements
  frm: ControlGroup;

  // status variables
  isSubmitting: boolean;
  isSuccessful: boolean;

  reportAbandonedPage: ReportAbandonedPage;

  constructor(nav: NavController, fb: FormBuilder, ss:StatusService, gps:GpsService) {
    // save instances to object
    this.gpsService = gps;
    this.nav = nav;
    this.statusService = ss;

    // initialize variables
    this.isSubmitting = false;
    this.isSuccessful = false;

    // set up form
    this.frm = fb.group({
      bikeId: [null],
      location: [null, Validators.required],
      locationDescription: [null]
    });
  }

  close(event) {
    this.nav.pop();
  }

  save(event) {
    event.preventDefault();

    // show alert if errors exist
    if (this.locationErrors().required) {
      return this.showError('You must select a location.');
    } else {
      if (this.frm.controls.location.value === 'somewhereelse' && !this.frm.controls.locationDescription.value) {
        return this.showError('You must describe where the bike is located.');
      }
    }

    // assert no errors.  submit form results
    return this.doReportAbandoned();
  }


  //////// helper functions ////////

  doReportAbandoned() {
    if (this.isSubmitting) { return; }
    this.isSubmitting = true;

    let locationDescription = (this.frm.value['location'] === 'somewhereelse') ? this.frm.value['locationDescription'] : null;

    this.statusService.reportAbandoned(this.frm.value.bikeId, locationDescription, this.gpsService.latitude, this.gpsService.longitude)
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

  locationErrors() {
    return this.frm.controls.location.errors || {};
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
