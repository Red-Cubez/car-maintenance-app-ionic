import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
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

  gasUnit: string;
  currencyPrefernce: string;
  distanceUnit: String; 
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public setteingservice: SettingDataProvider, public events: Events)
  {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SettingsPage');
  }


  // setting data to array
  savesetting()
  {
   let settingdata = 
   {
    gasUnit: this.gasUnit,
    currencyPrefernce: this.currencyPrefernce,
    distanceUnit: this.distanceUnit
   }
   this.viewCtrl.dismiss(settingdata);
  }
}
