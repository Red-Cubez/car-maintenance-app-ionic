import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController,ModalController } from 'ionic-angular';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
 
/**
 * Generated class for the EditCarmaintenancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-carmaintenance',
  templateUrl: 'edit-carmaintenance.html',
})
export class EditCarmaintenancePage {
  settingDataMaintenance: any =[];
  maintenanceDataItems: any =[];
  index;
  itemTemp: any;
  costTemp;
  dateTemp;
  item;
  date;
  cost;
  year;
  indexOn;
  currentDate: string = new Date().toISOString();
  currency;

  constructor(public modalCtrl: ModalController,public alertCtrl: AlertController,public maintenanceService: MaintenanceDataProvider,public navCtrl: NavController, public navParams: NavParams,public settingService: SettingDataProvider,public viewCtrl: ViewController) {
   
    this.index = this.navParams.get('index');
    console.log("index on edit maintenance page = " + this.index);
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
    this.maintenanceService.getdata().then((finalData) => {
      this.maintenanceDataItems = JSON.parse(finalData);
      console.log('final data on maintenance detail page =  ' + this.maintenanceDataItems);

      this.itemTemp = this.maintenanceDataItems[this.index].maintenanceItem;
      this.dateTemp = this.maintenanceDataItems[this.index].maintenanceDate;
      this.costTemp = this.maintenanceDataItems[this.index].maintenanceCost;
      this.indexOn = this.maintenanceDataItems[this.index].indexonMaintenance;
      if(this.cost == null){
        this.cost = this.costTemp
      }
      if(this.date == null){
        this.date = this.dateTemp
      }
      if(this.item == null){
        this.item = this.itemTemp
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCarmaintenancePage');
  }
  
  savemaintenancesetting(){
    if(this.maintenanceDataItems != null){
      let data = {
        indexonMaintenance: this.indexOn,
        maintenanceCost: this.cost,
        maintenanceDate: this.date,
        maintenanceItem: this.item,
        maintenanceYear: this.date.slice(0,4)
      }
      this.viewCtrl.dismiss(data);
      
    }
  }
  goto(){
    this.navCtrl.pop();
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
  delete(final){

    let index = this.index;
   
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete the selected Car Data?',
      buttons: [{
        text: 'Delete',
        handler: () =>{
         
          if(this.maintenanceDataItems != null){
            // index = this.maintenanceDataItems.indexOf(final);
            // indexLength = this.maintenanceDataItems.length;
            if(index > -1){
              for(let i=0; i<this.maintenanceDataItems.length;i++){
                if(i == index){
                  this.maintenanceDataItems.splice(index, 1)
                  this.maintenanceService.savemaintenace(this.maintenanceDataItems);
                }
              }
            }
          } 
          this.navCtrl.resize();
          //this.navCtrl.pop();
          let data = {
            temprary: 'toDelete'
          }
          this.viewCtrl.dismiss(data);
          // let modal = this.modalCtrl.create(MaintenanceCostDetailPage);
          // modal.present();
        }
      },
      {
        text: 'Cancel',
        handler: () => {
        //this.navCtrl.pop();
            
      }
    }]
    });
    alert.present();
       
  }
}
