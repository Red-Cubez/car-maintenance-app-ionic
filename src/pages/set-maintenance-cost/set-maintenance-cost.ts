import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { parseDate, DateTimeData } from 'ionic-angular/util/datetime-util';
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
 

  constructor(public settingService: SettingDataProvider,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public modalCtrl: ModalController) {
    let datam = {
      currencyType: 'Dollar',
      gasUnit: 'Litre',
      distanceUnit: 'KiloMeter'
    }
    this.settingService.getdata().then((settingData) =>{
      this.settingDataMaintenance = JSON.parse(settingData);
      if(this.settingDataMaintenance == null){
        this.settingDataMaintenance = datam;
      }
      if(this.settingDataMaintenance.currencyType == undefined){
        this.settingDataMaintenance.currencyType = datam.currencyType;
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
