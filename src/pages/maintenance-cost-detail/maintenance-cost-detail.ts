import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { FinalDataProvider } from '../../providers/final-data/final-data';  
import { MaintenanceGraphProvider } from '../../providers/maintenance-graph/maintenance-graph';
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

  public maintenanceDataItems = [];
  settingDatareq = [];
  indexonMaintenancedetail;
  public finalDataArray = [];
  abcd: any;
  public maintenanceGraphArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceService: MaintenanceDataProvider, public events: Events, public finaldataservice: FinalDataProvider, public settingService: SettingDataProvider, public maintenancegraphservice: MaintenanceGraphProvider) {
    let datam: any = {
      currencyPrefernce: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
    this.maintenanceService.getdata().then((finalData) => {
      this.maintenanceDataItems = JSON.parse(finalData);
      console.log('final data on maintenance detail page =  ' + this.maintenanceDataItems);
    });
    this.indexonMaintenancedetail = this.navParams.get('indexSending');
    console.log('index on maintenance = ' + this.indexonMaintenancedetail);
    
    this.settingService.getdata().then((settingData) =>{
      this.settingDatareq = JSON.parse(settingData);
      if (this.settingDatareq == null){
        this.settingDatareq = datam;
        console.log("default setting value = " + this.settingDatareq)
      }
    });
    console.log('setting data on setting page - ' + this.settingDatareq);
         
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceCostDetailPage');
    console.log('index on maintenance = ' + this.navParams.get('indexSending'));
  }

  // jump to maintenance setting page 
  gotosetmaintenancecost(){
    let modal = this.modalCtrl.create(SetMaintenanceCostPage);
    modal.onDidDismiss(maintenanceItems =>{
      if(maintenanceItems != null){
        let data = {
          indexonMaintenance: this.indexonMaintenancedetail,
          maintenanceCost: maintenanceItems.maintenanceCost,
          maintenanceDate: maintenanceItems.maintenanceDate,
          maintenanceItem: maintenanceItems.maintenanceItem
        }
        this.savemaintenance(data);
      } // end if 
      else{
        console.log(' null value on maintenance detail page')
      }
    });
    modal.present();
  }


  // saving a=maintenance data to provider
  savemaintenance(maintenancedata){
    if( this.maintenanceDataItems == null){
      console.log("creating new array");
      this.maintenanceDataItems = [];
      console.log("maintenance items - " + this.maintenanceDataItems);
    }
    else{
      console.log("existing maintenance data items- " + this.maintenanceDataItems);
    }
    this.maintenanceDataItems.push(maintenancedata);
    this.maintenanceService.savemaintenace(this.maintenanceDataItems);
  }

}
