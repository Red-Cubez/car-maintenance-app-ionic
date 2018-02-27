import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { parseDate, DateTimeData } from 'ionic-angular/util/datetime-util';
import { SettingsPage } from '../settings/settings';
/**
 * Generated class for the SetMaintenanceCostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-maintenance-cost',
  templateUrl: 'set-maintenance-cost.html',
})
export class SetMaintenanceCostPage {

  maintenanceItem: string;
  maintenanceDate: String;
  maintenanceCost: string;
  maintenanceYear: String;
  currencyType: string
  public settingDatareq = [];
  public settingDataMaintenance: any = [];

  currentDate: string = new Date().toISOString();
  currency;
  constructor(public settingService: SettingDataProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public modalCtrl: ModalController) {
    let datam = {
      currencyType: 'USA-Dollar',
      gasUnit: 'Litre',
      distanceUnit: 'KiloMeter'
    }

    console.log(this.currentDate);
    this.settingService.getdata().then((settingData) =>{
      this.settingDataMaintenance = JSON.parse(settingData);
      if(this.settingDataMaintenance == null){
        this.settingDataMaintenance = datam;
      }
      if(this.settingDataMaintenance.currencyType == undefined){
        this.settingDataMaintenance.currencyType = datam.currencyType;
      }
      if(this.settingDataMaintenance.currencyType == "USA-Dollar"){
        this.currency = '$';
      }
      if(this.settingDataMaintenance.currencyType == "British-Pound"){
        this.currency = '₤';
      }
      if(this.settingDataMaintenance.currencyType == "Canadian-Dollar"){
        this.currency = 'Can-$'
      }
      if(this.settingDataMaintenance.currencyType == "Pakistani-Ruppee"){
        this.currency = 'Rs'
      }
      console.log('setting data on maintenance page + ' + this.settingDataMaintenance);
    });
    console.log('setting data on setting page - ' + this.settingDatareq);
    console.log('setting data on setting page  indexx - ' + this.navParams.get('inexxnumber')); 
       
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SetMaintenanceCostPage');
  }
  // saving maintenance data to array
  savemaintenancesetting(){
    if ((this.maintenanceItem == null) || (this.maintenanceItem == "") || (this.maintenanceItem == " ")){
      // do nothing if maintenanceItem is empty
    } // end if
    else {
      let maintenanceItems={
        maintenanceItem:  this.maintenanceItem, 
        maintenanceDate:  this.maintenanceDate, 
        maintenanceCost:  this.maintenanceCost,
        currencyType:     this.currencyType,
        maintenanceYear:  this.maintenanceDate.slice(0,4)
      };
      this.viewCtrl.dismiss(maintenanceItems);
      
    } // end else
  }  
  
 
}
