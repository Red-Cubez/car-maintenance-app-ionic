import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { EditCarmaintenancePage } from '../edit-carmaintenance/edit-carmaintenance';

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
  settingDatareq: any= [];
  indexonMaintenancedetail;
  public settingDataMaintenance: any = [];
  finalMaintenance: any =[];
  constructor(public settingService: SettingDataProvider,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceService: MaintenanceDataProvider, public events: Events) {
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
    this.indexonMaintenancedetail = this.navParams.get('indexSending');
    console.log('index on maintenance = ' + this.indexonMaintenancedetail);
    this.maintenanceService.getdata().then((finalData) => {
      this.maintenanceDataItems = JSON.parse(finalData);
      console.log('final data on maintenance detail page =  ' + this.maintenanceDataItems);
    });     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceCostDetailPage');
    console.log('index on maintenance = ' + this.navParams.get('indexSending'));
  }

  editmaintenance(final){
    let index = this.maintenanceDataItems.indexOf(final);
    console.log("index on = " + index)
    let modal = this.modalCtrl.create(EditCarmaintenancePage, {
      index,
    });

    modal.onDidDismiss(data =>{
      if(data != 0){
        let dataOn = {
          indexonMaintenance: data.indexonMaintenance,
          maintenanceCost: data.maintenanceCost,
          maintenanceDate: data.maintenanceDate,
          maintenanceItem: data.maintenanceItem,
          maintenanceYear: data.maintenanceYear
        }
        this.maintenanceDataItems[index] = dataOn;
        console.log("maintenence on = " + this.maintenanceDataItems[index]);
        this.maintenanceService.savemaintenace(this.maintenanceDataItems);
      }
    })
    modal.present();
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
          maintenanceItem: maintenanceItems.maintenanceItem,
          maintenanceYear: maintenanceItems.maintenanceYear
        }
        this.savemaintenance(data);
        console.log(' null value on maintenance detail page' + maintenanceItems.maintenanceYear)
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
