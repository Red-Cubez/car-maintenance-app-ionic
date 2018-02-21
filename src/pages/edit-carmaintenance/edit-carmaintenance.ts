import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';

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

  constructor(public maintenanceService: MaintenanceDataProvider,public navCtrl: NavController, public navParams: NavParams,public settingService: SettingDataProvider,public viewCtrl: ViewController) {
   
    this.index = this.navParams.get('index');
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
  savemaintenance(maintenancedata){
    if( this.maintenanceDataItems == null){
      console.log("creating new array");
      this.maintenanceDataItems = [];
      console.log("maintenance items - " + this.maintenanceDataItems);
    }
    else{
      console.log("existing maintenance data items- " + this.maintenanceDataItems);
    }
    this.maintenanceDataItems[this.index] = maintenancedata;
    this.maintenanceService.savemaintenace(this.maintenanceDataItems);
  }
}
