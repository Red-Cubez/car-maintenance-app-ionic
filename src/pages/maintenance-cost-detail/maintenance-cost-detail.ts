import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController,Content} from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { EditCarmaintenancePage } from '../edit-carmaintenance/edit-carmaintenance';
import { RelationDataProvider } from '../../providers/relation-data/relation-data';
import { HomePage } from '../home/home';
import { CarDetailPage } from '../car-detail/car-detail';
import { SettingsPage } from '../settings/settings';

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
  @ViewChild(Content) content: Content;

  public maintenanceDataItems = [];
  settingDatareq: any= [];
  indexonMaintenancedetail;
  public settingDataMaintenance: any = [];
  finalMaintenance: any =[];
  relationArray: any = [];
  relationNumber;
  currency;
  constructor(public alertCtrl: AlertController,public relationService: RelationDataProvider,public settingService: SettingDataProvider,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceService: MaintenanceDataProvider, public events: Events) {
    this.indexonMaintenancedetail = this.navParams.get('indexSending');
    let datam = {
      currencyType: 'USA-Dollar',
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
    console.log('index on maintenance = ' + this.indexonMaintenancedetail);
    this.maintenanceService.getdata().then((finalData) => {
      this.maintenanceDataItems = JSON.parse(finalData);
      console.log('final data on maintenance detail page =  ' + this.maintenanceDataItems);
    });
    this.relationService.getdata().then((relationData) => {
      this.relationArray = JSON.parse(relationData);
      console.log('relation data on maintenance detail page =  ' + this.relationArray);
      if(this.relationArray != null){
        for(let i=0;i<this.relationArray.length;i++){
          if(this.relationArray[i].carIndex == this.indexonMaintenancedetail){
            this.relationNumber = this.relationArray[i].relationNumber;
          }
        }
      }

    });   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceCostDetailPage');
    console.log('index on maintenance = ' + this.navParams.get('indexSending'));
  }
  goto(){
   this.navCtrl.pop();
  }

  editmaintenance(final){
    let index = this.maintenanceDataItems.indexOf(final);
    console.log("index on = " + index)
    let modal = this.modalCtrl.create(EditCarmaintenancePage, {
      index,
    });

    modal.onDidDismiss(data =>{
      if(data == undefined){
      }
      else{
        if(data != undefined){
          if(data.temprary == 'toDelete'){
            console.log("data is defined and temprary is here")
            let dataOn = {
              indexonMaintenance: 0,
              maintenanceCost: 0,
              maintenanceDate: 0,
              maintenanceItem: 0,
              maintenanceYear: 0
            }
            this.maintenanceDataItems[index] = dataOn;
            this.maintenanceDataItems.splice(index,1);
            console.log("maintenence on = " + this.maintenanceDataItems[index]);
            this.maintenanceService.savemaintenace(this.maintenanceDataItems);

          }
          else{
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
        }
      }
    });
    modal.present();
  }
  // jump to maintenance setting page 
  gotosetmaintenancecost(){
    let modal = this.modalCtrl.create(SetMaintenanceCostPage);
    modal.onDidDismiss(maintenanceItems =>{
      if(maintenanceItems != null){
        let data = {
          indexonMaintenance: this.relationNumber,
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
  gotoSettingPage(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.onDidDismiss(settingData =>{
      if(settingData.currencyType == undefined){
        let data = {
          currencyType: this.settingDataMaintenance.currencyType,
          gasUnit: settingData.gasUnit,
          distanceUnit: settingData.distanceUnit
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

        this.saveSetting(data);
      }
      else{
        let data = {
          currencyType: settingData.currencyType,
          gasUnit: settingData.gasUnit,
          distanceUnit: settingData.distanceUnit
        }
        if(settingData.currencyType == "USA-Dollar"){
          this.currency = '$';
        }
        if(settingData.currencyType == "British-Pound"){
          this.currency = '₤';
        }
        if(settingData.currencyType == "Canadian-Dollar"){
          this.currency = 'Can-$'
        }
        if(settingData.currencyType == "Pakistani-Ruppee"){
          this.currency = 'Rs'
        }

        this.saveSetting(data);
      }
    });
    modal.present();
  }
  saveSetting(data){
    this.settingDataMaintenance = data;
    this.settingService.saveSettingData(this.settingDataMaintenance);
  }
  
}
