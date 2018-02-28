import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';

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
  currencyPreference: string;
  gasUnit: string;
  distanceUnit: string;
  settingDataarr: any = [];
  settingUpData: any =[];
  currency;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public settingService: SettingDataProvider) {
    let datam = {
      currencyType: 'USD ($)',
      gasUnit: 'Litres',
      distanceUnit: 'Kilometers'
    }
    this.settingService.getdata().then((settingData) =>{
      this.settingDataarr = JSON.parse(settingData);
      if(this.settingDataarr == null){
        this.settingDataarr = datam;
      }
      if(this.settingDataarr.gasUnit == undefined){
        this.settingDataarr.gasUnit = datam.gasUnit;
      }
      if(this.settingDataarr.currencyType == undefined){
        this.settingDataarr.currencyType = datam.currencyType;
      }
      if(this.settingDataarr.distanceUnit == undefined){
        this.settingDataarr.distanceUnit = datam.distanceUnit;
      }

      if(this.settingDataarr.currencyType == "USD ($)"){
        this.currency = '$';
      }
      if(this.settingDataarr.currencyType == "GBP (₤)"){
        this.currency = '₤';
      }
      if(this.settingDataarr.currencyType == "CAD ($)"){
        this.currency = '$'
      }
      if(this.settingDataarr.currencyType == "PKR (Rs.)"){
        this.currency = 'Rs.'
      }
      console.log('setting data on setting page + ' + this.settingDataarr.currencyType );
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  savesetting(){
    let settingData = {
      currencyType: this.currencyPreference,
      gasUnit: this.gasUnit,
      distanceUnit: this.distanceUnit
    }
   
    this.saveSettingData(settingData);
    this.viewCtrl.dismiss(settingData);
  }
  saveSettingData(settingData){
    this.settingUpData = settingData;
    this.settingService.saveSettingData(this.settingUpData);
  }

}
