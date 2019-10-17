import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import * as moment from 'moment';
import { CarDataProvider } from '../../providers/car-data/car-data';
/**
 * Generated class for the SetGasMileagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-gas-mileage',
  templateUrl: 'set-gas-mileage.html',
})
export class SetGasMileagePage {


  mileageLitre;
  mileageDate = moment().format();
  mileageCost
  buttonClicked = false;
  currencyPreference;
  gasUnit
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public carDataProvider: CarDataProvider){
  }

  ionViewWillEnter(){
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
    console.log('ionViewDidLoad SetGasMileagePage');
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
      this.viewCtrl.dismiss(data);
    }
  }
  gotoSettingPage(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
}
