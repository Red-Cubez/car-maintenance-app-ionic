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

  gasUnit: any;
  currencyPreference: any;
  distanceUnit: any; 
  settingDataarr= [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public setteingService: SettingDataProvider, public events: Events){   
    let datam: any = {
      currencyPreference: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
    this.setteingService.getdata().then((settingData) =>{
      this.settingDataarr = JSON.parse(settingData);
      if (this.settingDataarr == null){
        this.settingDataarr = datam;
        console.log("default setting value = " + this.settingDataarr)
      }
    });
    console.log('setting data on setting page - ' + this.settingDataarr);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    if ((this.currencyPreference == null) || (this.currencyPreference == "") || (this.currencyPreference == " ")){
      // do nothing if maintenanceItem is empty
    }
  }
  // setting data to array
  savesetting(){
    if ((this.currencyPreference == null) || (this.currencyPreference == "") || (this.currencyPreference == " ")) {
      // do nothing if maintenanceItem is empty
    } // end if
    else{
      let settingData = {
        gasUnit: this.gasUnit,
        currencyPreference: this.currencyPreference,
        distanceUnit: this.distanceUnit
      }
      this.viewCtrl.dismiss(settingData);
    }
  }
}
