import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the SetMaintenanceCostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-maintenance-cost',
  templateUrl: 'set-maintenance-cost.html',
})
export class SetMaintenanceCostPage {

  maintenanceItem;
  maintenanceDate = moment().format();
  maintenanceCost;
  buttonClicked = false;
  currencyPreference
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public modalCtrl: ModalController,public carDataProvider: CarDataProvider) {
  }
  ionViewWillEnter() {
    console.log('ionViewDidLoad SetMaintenanceCostPage');
    this.carDataProvider.getcurrencytype().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.currencyPreference = 'PKR'
      }
      else {
        this.currencyPreference = res;
      }
    });
  }
  gotoSettingPage(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
  dismissing() {
    this.viewCtrl.dismiss();
  }
  saveRecord() {
    this.buttonClicked = true;
    if (this.maintenanceItem != undefined && this.maintenanceItem != '' && this.maintenanceCost != undefined && this.maintenanceCost != '') {
      this.maintenanceItem = this.maintenanceItem[0].toUpperCase() + this.maintenanceItem.slice(1);
      let data = {
        maintenanceItem: this.maintenanceItem,
        maintenanceDate: this.maintenanceDate,
        maintenanceCost: this.maintenanceCost,
        maintenanceDateString: moment(this.maintenanceDate).get('date') + '-' + (moment(this.maintenanceDate).get('month') + 1) + '-' + moment(this.maintenanceDate).get('year')
      }
      this.viewCtrl.dismiss(data);
    }
  }
}
