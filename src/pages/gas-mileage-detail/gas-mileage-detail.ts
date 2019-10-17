import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController, AlertController } from 'ionic-angular';
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
  gasUnit;
  mileageRecords2;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,public viewCtrl:ViewController, public carDataProvider: CarDataProvider) {

  }
  ionViewWillEnter() {
    this.carDataProvider.getcurrencytype().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.currencyPreference = '$';
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
      console.log('maintenance detail = ' + JSON.stringify(this.mileageRecords));
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

  deleteMileageRecord(value)
  {
    let index = this.mileageRecords.indexOf(value);
    console.log('index = ' + index);

    console.log('Detail List' + JSON.stringify(this.mileageRecords[index]));

    let alrt = this.alertCtrl.create({
      title: 'Delete Record',
      message: 'Do you want to delete ' + this.mileageRecords[index].mileageLitre + '`s ' + 'record ?',
      buttons: [{
        text: 'No'
      }, {
        text: 'Yes',
        handler: () => {
          let ids = [];
          let pres = this.mileageRecords[index];
          console.log('pres = ' + JSON.stringify(pres))
          for (let i = 0; i < this.mileageRecords.length; i++) {
            if (i == index) {
              this.mileageRecords.splice(index, 1)
            }
          }
          this.carDataProvider.setconsumptionDetail(this.mileageRecords);
          this.carDataProvider.saveCarData(this.carData);
        }
      }]
    })
    alrt.present();

  }
}
