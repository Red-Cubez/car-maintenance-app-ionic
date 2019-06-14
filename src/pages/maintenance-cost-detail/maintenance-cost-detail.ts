import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { EditCarmaintenancePage } from '../edit-carmaintenance/edit-carmaintenance';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the MaintenanceCostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-cost-detail',
  templateUrl: 'maintenance-cost-detail.html',
})
export class MaintenanceCostDetailPage {
  @ViewChild(Content) content: Content;
  carData = [];
  indexNumber;
  maintenanceRecords = [];
  currencyPreference
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, public carDataProvider: CarDataProvider) {

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
    console.log('ionViewDidLoad MaintenanceCostDetailPage');
    this.indexNumber = this.navParams.get('indexOfRecord');
    this.carDataProvider.getCardata().then(res => {
      this.carData = res;
      this.maintenanceRecords = this.carData[this.indexNumber].carMaintenanceDetail;
      console.log('maintenance detail = ' + this.maintenanceRecords)
    })
  }
  dismissing() {
    this.viewCtrl.dismiss();
  }
  gotoAddManitenancePage() {
    let modal = this.modalCtrl.create(SetMaintenanceCostPage);

    modal.onDidDismiss(res =>{
      if (res != undefined){
        this.maintenanceRecords.push(res);
        this.carData[this.indexNumber].carMaintenanceDetail = this.maintenanceRecords;
        this.carDataProvider.saveCarData(this.carData);
      }
    })
    modal.present();
  }
  editMaintenanceRecord(value){
    let index = this.maintenanceRecords.indexOf(value)
    let modal = this.modalCtrl.create(EditCarmaintenancePage,{
      indexOfRecord: this.indexNumber,
      indexOfMaintenance:index
    })
    modal.present();
  }
  gotoSettingPage(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }

}
