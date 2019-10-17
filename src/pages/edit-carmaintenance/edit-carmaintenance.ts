import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the EditCarmaintenancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-carmaintenance',
  templateUrl: 'edit-carmaintenance.html',
})
export class EditCarmaintenancePage {
  maintenanceItem;
  maintenanceDate;
  maintenanceCost;
  buttonClicked = false;
  carData = [];
  indexNumberCar;
  indexNumberManitenance;
  currencyPreference
  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public carDataProvider: CarDataProvider) {
  }

  ionViewWillEnter() {
    this.carDataProvider.getcurrencytype().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.currencyPreference = 'PKR'
      }
      else {
        this.currencyPreference = res;
      }
    });
    console.log('ionViewDidLoad EditCarmaintenancePage');
    this.indexNumberCar = this.navParams.get('indexOfRecord')
    this.indexNumberManitenance = this.navParams.get('indexOfMaintenance');
    this.carDataProvider.getCardata().then(res =>{
      this.carData = res;
      this.maintenanceItem = this.carData[this.indexNumberCar].carMaintenanceDetail[this.indexNumberManitenance].maintenanceItem;
      this.maintenanceDate = this.carData[this.indexNumberCar].carMaintenanceDetail[this.indexNumberManitenance].maintenanceDate;
      this.maintenanceCost = this.carData[this.indexNumberCar].carMaintenanceDetail[this.indexNumberManitenance].maintenanceCost;
    })
    console.log('index of record = ' + this.indexNumberCar + ' ' + this.indexNumberManitenance)
 
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
      this.carData[this.indexNumberCar].carMaintenanceDetail[this.indexNumberManitenance] = data;
      this.carDataProvider.saveCarData(this.carData);
      this.viewCtrl.dismiss();
    }
  }
  gotoSettingPage(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }

}
