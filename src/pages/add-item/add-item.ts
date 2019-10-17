import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { SetGasMileagePage } from '../set-gas-mileage/set-gas-mileage';
import { CarDataProvider } from '../../providers/car-data/car-data';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {


  carData = []
  carMake: string;
  carYear: string;
  carModel;
  carMileage;
  carMaintenanceDetail = [];
  carMileageDetail = [];
  carMaintenanceDetailLength = 0;
  carMileageDetailLength = 0;
  buttonClicked = false;
  currencyPreference;
  gasUnit
  constructor(public navCtrl: NavController, public navParams: NavParams, public vewiCtrl: ViewController, public modalCtrl: ModalController, public carDataProvider: CarDataProvider) {

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
    this.carDataProvider.getGasUnit().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.gasUnit = 'Litre(s)'
      }
      else {
        this.gasUnit = res;
      }
    })
    console.log('ionViewDidLoad AddItemPage = ' + this.carMaintenanceDetail.length);
    this.carMaintenanceDetailLength = this.carMaintenanceDetail.length;
    this.carMileageDetailLength = this.carMileageDetail.length;

    this.carDataProvider.getCardata().then(res => {
      this.carData = res;
    })
  }
  dismissing() {
    this.vewiCtrl.dismiss();
  }
  // saving items data to array and send it to home page
  saveitems() {
  }

  gotoAddMaintenanceRecordPage() {
    let modal = this.modalCtrl.create(SetMaintenanceCostPage);
    modal.onDidDismiss(res => {
      if (res != undefined) {
        if (this.carMaintenanceDetail == null) {
          this.carMaintenanceDetail = [];
        }
        this.carMaintenanceDetail.push(res);
        this.carMaintenanceDetailLength = this.carMaintenanceDetail.length;
      }
    })
    modal.present();
  }
  gotoAddMileageRecordPage() {
    let modal = this.modalCtrl.create(SetGasMileagePage);
    modal.onDidDismiss(res => {
      if (res != undefined) {
        if (this.carMileageDetail == null) {
          this.carMileageDetail = [];
        }
        this.carMileageDetail.push(res);
        this.carMileageDetailLength = this.carMileageDetail.length;
      }

    })
    modal.present();
  }
  saveInformation() {
    this.buttonClicked = true;
    if (this.carMake != undefined && this.carMake != '' && this.carModel != undefined && this.carModel != '' && this.carYear != undefined && this.carYear != '' && this.carMileage != undefined && this.carMileage != '') {
    
     this.carMake = this.carMake[0].toUpperCase() + this.carMake.slice(1);
     this.carModel = this.carModel[0].toUpperCase() + this.carModel.slice(1);
     console.log('car make = ' + this.carMake)
      let data = {
        carMake: this.carMake,
        carModel: this.carModel,
        carYear: this.carYear,
        carMileage: this.carMileage,
        carMaintenanceDetail: this.carMaintenanceDetail,
        carMileageDetail: this.carMileageDetail
      }
      if (this.carData == null) {
        this.carData = [];
      }
      this.carData.push(data);
      this.carDataProvider.saveCarData(this.carData);
      this.vewiCtrl.dismiss();
    }
  }

}
