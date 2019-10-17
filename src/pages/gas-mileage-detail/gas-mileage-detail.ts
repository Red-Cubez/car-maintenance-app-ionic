import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SetGasMileagePage } from '../set-gas-mileage/set-gas-mileage';
import { EditMileagePage } from '../edit-mileage/edit-mileage';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the GasMileageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gas-mileage-detail',
  templateUrl: 'gas-mileage-detail.html',
})
export class GasMileageDetailPage {

  carData = [];
  indexNumber;
  mileageRecords = [];
  currencyPreference
  gasUnit
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public viewCtrl:ViewController, public carDataProvider: CarDataProvider) {

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
    console.log('ionViewDidLoad MaintenanceCostDetailPage');
    this.indexNumber = this.navParams.get('indexOfRecord');
    this.carDataProvider.getCardata().then(res => {
      this.carData = res;
      this.mileageRecords = this.carData[this.indexNumber].carMileageDetail;
      console.log('maintenance detail = ' + this.mileageRecords)
    })
  }
  dismissing() {
    this.viewCtrl.dismiss();
  }
  gotoAddMileagePage() {
    let modal = this.modalCtrl.create(SetGasMileagePage);

    modal.onDidDismiss(res =>{
      if (res != undefined){
        this.mileageRecords.push(res);
        this.carData[this.indexNumber].carMileageDetail = this.mileageRecords;
        this.carDataProvider.saveCarData(this.carData);
      }
    })
    modal.present();
  }
  editMileageRecord(value){
    let index = this.mileageRecords.indexOf(value)
    let modal = this.modalCtrl.create(EditMileagePage,{
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
