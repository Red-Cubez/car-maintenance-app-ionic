import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
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
  maintenanceDate: string;
  maintenanceCost: string;
  currencyType: string
  public settingDatareq = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public settingService: SettingDataProvider, public modalCtrl: ModalController) {
    let datam: any = {
      currencyPrefernce: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre', 
    }
    this.settingService.getdata().then((settingData) =>{
      this.settingDatareq = JSON.parse(settingData);
      if (this.settingDatareq == null){
        this.settingDatareq = datam;
        console.log("default setting value = " + this.settingDatareq)
      }
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
        currencyType: this.currencyType 
      };
      this.viewCtrl.dismiss(maintenanceItems);
    } // end else
  }  
}
