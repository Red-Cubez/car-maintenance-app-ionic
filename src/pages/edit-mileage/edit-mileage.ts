import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ModalController } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import * as moment from 'moment';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the EditMileagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-mileage',
  templateUrl: 'edit-mileage.html',
})
export class EditMileagePage {

  indexNumberCar
  indexNumberMileage;
  carData = [];
  mileageLitre;
  mileageDate ;
  mileageCost
  buttonClicked = false;
  currencyPreference;
  gasUnit;
  constructor(public modalCtrl: ModalController,public alertCtrl: AlertController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public carDataProvider: CarDataProvider) {
  }

  ionViewDidLoad() {
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
    console.log('ionViewDidLoad EditMileagePage');
    this.indexNumberCar = this.navParams.get('indexOfRecord')
    this.indexNumberMileage = this.navParams.get('indexOfMaintenance');
    this.carDataProvider.getCardata().then(res =>{
      this.carData = res;
      this.mileageLitre = this.carData[this.indexNumberCar].carMileageDetail[this.indexNumberMileage].mileageLitre;
      this.mileageDate = this.carData[this.indexNumberCar].carMileageDetail[this.indexNumberMileage].mileageDate;
      this.mileageCost = this.carData[this.indexNumberCar].carMileageDetail[this.indexNumberMileage].mileageCost;
    })
    console.log('index of record = ' + this.indexNumberCar + ' ' + this.indexNumberMileage)
  }
  dismissing() {
    this.viewCtrl.dismiss();
  }
  saveRecord() {
    this.buttonClicked = true;
    if (this.mileageLitre != undefined && this.mileageLitre != '' && this.mileageCost != undefined && this.mileageCost != '') {
      let data = {
        mileageLitre: this.mileageLitre,
        mileageDate: this.mileageDate,
        mileageCost: this.mileageCost,
        mileageDateString: moment(this.mileageDate).get('date') + '-' + (moment(this.mileageDate).get('month') + 1) + '-' + moment(this.mileageDate).get('year')
      }
      this.carData[this.indexNumberCar].carMileageDetail[this.indexNumberMileage] = data;
      this.carDataProvider.saveCarData(this.carData);
      this.viewCtrl.dismiss();
    }
  }
  gotoSettingPage(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
}
