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
  currencyPrefernce: any;
  distanceUnit: any; 
  settingdataarr= [];
 
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public setteingservice: SettingDataProvider, public events: Events)
  {   
    let datam: any = {
    
      currencyPrefernce: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
    this.setteingservice.getdata().then((settingdata) =>{
    this.settingdataarr = JSON.parse(settingdata);
    if (this.settingdataarr == null){

      this.settingdataarr = datam;

      console.log("default setting value = " + this.settingdataarr)
    }
    
        });
        console.log('setting data on setting page - ' + this.settingdataarr);
        

   
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SettingsPage');
    if ((this.currencyPrefernce == null) || (this.currencyPrefernce == "") || (this.currencyPrefernce == " "))
  {
     // do nothing if maintenanceItem is empty
  }
  }


  // setting data to array
  savesetting()
  {

    if ((this.currencyPrefernce == null) || (this.currencyPrefernce == "") || (this.currencyPrefernce == " "))
  {
     // do nothing if maintenanceItem is empty
  } // end if
  else{
   let settingdata = 
   {
    gasUnit: this.gasUnit,
    currencyPrefernce: this.currencyPrefernce,
    distanceUnit: this.distanceUnit
   }
   this.viewCtrl.dismiss(settingdata);
  }
}
}
