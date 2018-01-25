import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
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

   public settingdatareq = [];

   abdc;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, public settingservice: SettingDataProvider) 
  {
    // gettig data from seeting-data provider 
   this.settingservice.getdata().then((settingdata) =>
   {
   this.settingdatareq = JSON.parse(settingdata);
   console.log('this is data setting - ' + this.settingdatareq);
   console.log('this is data setting from maintenance ' + settingdata);
   console.log( 'this is fuel type - ' + settingdata[1].gasUnit)
   });
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SetMaintenanceCostPage');
  }


// saving maintenance data to array
  savemaintenancesetting()
  {
  if ((this.maintenanceItem == null) || (this.maintenanceItem == "") || (this.maintenanceItem == " "))
  {
     // do nothing if maintenanceItem is empty
  } // end if
  else 
  {
    let maintenanceitems=
    {
    maintenanceItem:  this.maintenanceItem, 
    maintenanceDate:  this.maintenanceDate, 
    maintenanceCost:  this.maintenanceCost 
    };
    this.viewCtrl.dismiss(maintenanceitems);
  } // end else
  }  
}
