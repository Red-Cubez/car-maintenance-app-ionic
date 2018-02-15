import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { FinalDataProvider } from '../../providers/final-data/final-data';  
import { YearMaintenanceProvider } from '../../providers/year-maintenance/year-maintenance';
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
  settingDatareq: any= [];
  indexonMaintenancedetail;
  dateOfFirst: any;
  addingCost: any = [];
  maintenanceDataForCurrent: any = [];
  addedCost: any = [];
  sum: number =  0;
  currentDate: any;
  currentIndex: any;
  items: any = "";
  yearOfFirst: any = "";
  sumOfYearlyCost: number = 0;
  itemsYearly: any = "";
  indexYearly: any = "";
  yearlyData: any = [];
  yearFinal: any = [];
  dateYearly: any = "";


  constructor(public navCtrl: NavController,public yearFinalService:YearMaintenanceProvider, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceService: MaintenanceDataProvider, public events: Events, public finaldataservice: FinalDataProvider, public settingService: SettingDataProvider, public maintenancegraphservice: MaintenanceGraphProvider) {
    let datam: any = {
      currencyPreference: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
    this.indexonMaintenancedetail = this.navParams.get('indexSending');
    console.log('index on maintenance = ' + this.indexonMaintenancedetail);
    this.maintenanceService.getdata().then((finalData) => {
      this.maintenanceDataItems = JSON.parse(finalData);
      console.log('final data on maintenance detail page =  ' + this.maintenanceDataItems);
      let finalMaintenanceData={
       dataMaintenanceOn: 0
      }
      let finalYearData={
        dataYearOn: 0
      }
      if(this.maintenanceDataItems != null){
        for(let i= 0; i< this.maintenanceDataItems.length;i++){
          if(this.maintenanceDataItems[i].indexonMaintenance == this.indexonMaintenancedetail){
            this.maintenanceDataForCurrent.push(this.maintenanceDataItems[i]);
          }
        }
        if(this.maintenanceDataForCurrent != 0){
          this.dateOfFirst = this.maintenanceDataForCurrent[0].maintenanceDate;
        }
        for(let i =0; i<this.maintenanceDataForCurrent.length;i++){
          if(this.maintenanceDataForCurrent[i].maintenanceDate == this.dateOfFirst){
            this.sum += parseInt(this.maintenanceDataForCurrent[i].maintenanceCost);
            this.currentDate = this.maintenanceDataForCurrent[i].maintenanceDate;
            this.currentIndex = this.maintenanceDataForCurrent[i].indexonMaintenance;
            this.items += this.maintenanceDataForCurrent[i].maintenanceItem + ',';
          }
          else{
           this.addedCost.push({sum:this.sum,currentDate:this.currentDate,currentIndex:this.currentIndex, items:this.items})
            this.sum = 0;
            this.items= "";
            this.dateOfFirst = this.maintenanceDataForCurrent[i].maintenanceDate;
            this.currentDate = this.maintenanceDataForCurrent[i].maintenanceDate;
            this.currentIndex = this.maintenanceDataForCurrent[i].indexonMaintenance;
            this.items += this.maintenanceDataForCurrent[i].maintenanceItem + ',';
            this.sum += parseInt(this.maintenanceDataForCurrent[i].maintenanceCost);
          }
        }
        this.addedCost.push({sum:this.sum,currentDate:this.currentDate,currentIndex:this.currentIndex, items:this.items});
        if(this.addedCost != null){
          finalMaintenanceData.dataMaintenanceOn = this.addedCost;
          this.saveFinalData(finalMaintenanceData);
        }
        if(this.maintenanceDataForCurrent != 0){
          this.yearOfFirst = this.maintenanceDataForCurrent[0].maintenanceYear;
        }
        for(let i =0; i<this.maintenanceDataForCurrent.length;i++){
          if(this.maintenanceDataForCurrent[i].maintenanceYear == this.yearOfFirst){
            this.sumOfYearlyCost += parseInt(this.maintenanceDataForCurrent[i].maintenanceCost);
            this.itemsYearly += this.maintenanceDataForCurrent[i].maintenanceItem;
            this.indexYearly = this.maintenanceDataForCurrent[i].indexonMaintenance;
            this.dateYearly = this.maintenanceDataForCurrent[i].maintenanceYear;
          }
          else{

            this.yearlyData.push({sumOfYear:this.sumOfYearlyCost,itemsYearly:this.itemsYearly,indexYearly:this.indexYearly,dateYearly:this.dateYearly});
            this.sumOfYearlyCost = 0;
            this.itemsYearly = "";
            this.yearOfFirst = this.maintenanceDataForCurrent[i].maintenanceYear;
            this.sumOfYearlyCost += parseInt(this.maintenanceDataForCurrent[i].maintenanceCost);
            this.itemsYearly += this.maintenanceDataForCurrent[i].maintenanceItem + ',';
            this.indexYearly = this.maintenanceDataForCurrent[i].indexonMaintenance;
            this.dateYearly = this.maintenanceDataForCurrent[i].maintenanceYear;
          }
        }
        this.yearlyData.push({sumOfYear:this.sumOfYearlyCost,itemsYearly:this.itemsYearly,indexYearly:this.indexYearly,dateYearly:this.dateYearly});
        console.log("yearly cost  = " +  this.yearlyData);
        if(this.yearlyData != null){
          finalYearData.dataYearOn = this.yearlyData;
          this.saveYearData(finalYearData);
        }
      }
      console.log("adding cost  = " +  this.addedCost);
      
    });
    this.settingService.getdata().then((settingData) =>{
      this.settingDatareq = JSON.parse(settingData);
      console.log('setting data on setting page - ' + this.settingDatareq);
      if (this.settingDatareq == null){
        this.settingDatareq = datam;
        console.log("default setting value = " + this.settingDatareq);
      }
    });
    
         
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
  saveFinalData(maintenanceDataFinal){
    if( this.addingCost == null){
      console.log("creating new array");
      this.addingCost = [];
      console.log("maintenance final items - " + this.addingCost);
    }
    else{
      console.log("existing maintenance final data items- " + this.addingCost);
    }
    this.addingCost.push(maintenanceDataFinal);
    this.finaldataservice.saveFinalData(this.addingCost);
  }
  saveYearData(maintenanceDataFinal){
    if( this.yearFinal == null){
      console.log("creating new array");
      this.yearFinal = [];
      console.log("year items - " + this.yearFinal);
    }
    else{
      console.log("existing yera data items- " + this.yearFinal);
    }
    this.yearFinal.push(maintenanceDataFinal);
    this.yearFinalService.saveFinalData(this.yearFinal);
  }
}
