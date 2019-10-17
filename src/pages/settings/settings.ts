import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { DisclaimerPage } from "../disclaimer/disclaimer";
import { AboutUsPage } from '../about-us/about-us';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  currencyPreference;
  gasUnit = 'Litre(s)';
  distanceUnit = 'Km';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public carDataProvider: CarDataProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.carDataProvider.getcurrencytype().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.currencyPreference = '$'
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
    this.carDataProvider.getDistanceUnit().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.distanceUnit = 'Km'
      }
      else {
        this.distanceUnit = res;
      }
    })
  }

  gotoAboutUs()
  {
    this.navCtrl.push(AboutUsPage);
  }

  gotoDisclaimer()
  {
    this.navCtrl.push(DisclaimerPage);
  }

  changingCurrencyType() {
    console.log('ccc = ' + this.currencyPreference)
    this.carDataProvider.setCurrencyType(this.currencyPreference)

  }
  changingGasUnit() {
    console.log('ccc = ' + this.gasUnit)
    this.carDataProvider.setGasUnit(this.gasUnit)
  }
  changingDistanceUnit() {
    console.log('ccc = ' + this.distanceUnit);
    this.carDataProvider.setDistanceUnit(this.distanceUnit)

  }
  dismissing(){
    this.viewCtrl.dismiss();
  }

}
