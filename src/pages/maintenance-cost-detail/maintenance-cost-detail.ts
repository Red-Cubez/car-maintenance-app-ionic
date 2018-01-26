import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';

/**
 * Generated class for the MaintenanceCostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-cost-detail',
  templateUrl: 'maintenance-cost-detail.html',
})
export class MaintenanceCostDetailPage {

 public maintenancedataitems = [];

  settingdatareq = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceservice: MaintenanceDataProvider, public events: Events, public settingservice: SettingDataProvider) 
  {
    // grtting data from maintenance provider
  // this.maintenanceservice.getdata().then((maintenancedata) => 
  // {
  //  this.maintenancedataitems = JSON.parse(maintenancedata);
  // });

  // getting data from setting data provider
  // this.settingservice.getdata().then((settingdata) =>
  // {
  //  this.settingdatareq = JSON.parse(settingdata);
  //  console.log("this is data setting - " + this.settingdatareq);
  // });   
  }

  ionViewDidLoad() 
  {
   console.log('ionViewDidLoad MaintenanceCostDetailPage');
  }

  // jump to maintenance setting page 
  gotosetmaintenancecost()
  {
   let modal = this.modalCtrl.create(SetMaintenanceCostPage);
   modal.onDidDismiss(maintenanceitems =>{
  if(maintenanceitems != null)
  {
   this.savemaintenance(maintenanceitems);
  } // end if 

  else{
      console.log(' null value on maintenance detail page')
  }
  });
 
     modal.present();
  }


  // saving a=maintenance data to provider
  savemaintenance(maintenancedata)
  {

    if( this.maintenancedataitems == null)
    {
      console.log("creating new array");
      this.maintenancedataitems = [];
      console.log("maintenance items - " + this.maintenancedataitems);
    }
    else{
      console.log("existing maintenance data items- " + this.maintenancedataitems);
    }
    
  this.maintenancedataitems = maintenancedata;
  this.maintenanceservice.savemaintenace(this.maintenancedataitems);
  }
}