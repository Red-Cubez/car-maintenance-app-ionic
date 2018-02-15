import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, Events, AlertController } from 'ionic-angular';
import { AddItemPage} from '../add-item/add-item';
import { SettingsPage } from '../settings/settings';
import { CarDetailPage } from '../car-detail/car-detail';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { YearMaintenanceProvider } from '../../providers/year-maintenance/year-maintenance';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { FinalDataProvider } from '../../providers/final-data/final-data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public CarItems = [];
  vallue;
  // declaring arrays to store car items 
  public carMakes = [];
  public carYears = [] ;
  public carModels = [];
  public carMileages = [];
  public settingsData = [];
  public maintenanceRecordDelete: any= [];
  public mileageDataRecordDelete: any=[];
  public finalDataRecordDelete: any=[];
  public yearDataRecordDelete: any = [];
  
  constructor(public yearDataService: YearMaintenanceProvider,public finalDataService: FinalDataProvider,public mileageDataService: MileageDataProvider,public maintenanceDataService: MaintenanceDataProvider,public alertCtrl: AlertController,public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public events: Events, public dataService: CarDataProvider, public settingservice: SettingDataProvider){
    //getting car data 
    this.dataService.getdata().then((carData) =>{
      this.CarItems = JSON.parse(carData);
      console.log("Car Items in list - " + this.CarItems);
      console.log('this is it ' + carData)
    });
    this.maintenanceDataService.getdata().then((maintenanceData) =>{
      this.maintenanceRecordDelete = JSON.parse(maintenanceData);
      console.log("Maintenance Data on Home Page - " + this.maintenanceRecordDelete);
    });
    this.mileageDataService.getdata().then((mileageData) =>{
      this.mileageDataRecordDelete = JSON.parse(mileageData);
      console.log("Mileage Data on Home Page - " + this.maintenanceRecordDelete);
    });
    this.finalDataService.getdata().then((finalData) =>{
      this.finalDataRecordDelete = JSON.parse(finalData);
      console.log("final Data on Home Page - " + this.maintenanceRecordDelete);

    });
    this.yearDataService.getdata().then((yearFinalData) =>{
      this.yearDataRecordDelete = JSON.parse(yearFinalData);
      console.log("year final Data on Home Page - " + this.yearDataRecordDelete);

    });
  }
  ionViewWillEnter() {
    console.log( 'calling now - ionViewWillEnter ' );
  }
 

  ionViewDidLoad() {
    console.log( 'calling now - ViewDidLoad ' );
    if(this.CarItems == null){ 
      // do nothing if car items are not set
    }
  }
  
  //jump to setting page
  gotosettings(){
    let modal = this.modalCtrl.create(SettingsPage);
    modal.onDidDismiss((settingData)=>{
      this.savesetting(settingData);
      console.log(settingData);
    });
    modal.present();
  }


  //jump to add items page
  gotoadditempage(){
    let modal = this.modalCtrl.create(AddItemPage);
    modal.onDidDismiss((carItem) =>{
      if(carItem != null){
        this.save(carItem)
        console.log("when items not null - received : " + carItem.carMake);
      }// end if
      else{
        console.log("when items null - received : " + carItem.carMake);
      }//end else
    });
    modal.present();
  }


  //jump to detail page
  gotocardetailpage(carItem){
    console.log("going to the car item -" + carItem.carMake);
    let index = this.CarItems.indexOf(carItem);
    this.navCtrl.push(CarDetailPage, {
      index,
      CarItem: carItem,
    });
  }

  // save car data in car-data provider
  save(carItem){
    console.log("inserting into array - received : " + carItem.carMake);
    if(this.CarItems == null){
      console.log("creating new array");
      this.CarItems = [];
      console.log("car items - " + this.CarItems);
    }
    console.log("data before push -" + this.CarItems.length);
    this.CarItems.push(carItem);
    console.log("new data in car item - " + this.CarItems.length);

    this.dataService.save(this.CarItems);
  }


  // save detting data in setting-data provider
  savesetting(dataSetting){
    if(this.settingsData == null){
      this.settingsData = [];
    }
    this.settingsData=dataSetting;
    this.settingservice.savetoStorage(this.settingsData);
    console.log( 'setting data ' + this.settingsData);
  }
  delete(carItem){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete the selected Car Data?',
      buttons: [
      {
        text: 'Delete',
        handler: () =>{
          let index = this.CarItems.indexOf(carItem);
          if(index > -1){
            for(let carItem of this.CarItems){
              this.CarItems.splice(index, 1);
            this.dataService.save(this.CarItems);
            }
          }
          if(this.maintenanceRecordDelete != 0){
            for(let i = 0;i<this.maintenanceRecordDelete.length;i++){
              if(this.maintenanceRecordDelete[i].indexonMaintenance == index){
                let indexMaintenance = this.maintenanceRecordDelete.indexOf(this.maintenanceRecordDelete[i]);
                this.maintenanceRecordDelete.splice(indexMaintenance,1);
                this.maintenanceDataService.savemaintenace(this.maintenanceRecordDelete);
              }
            }
          }
          if(this.mileageDataRecordDelete != 0){
            for(let i = 0;i<this.mileageDataRecordDelete.length;i++){
              if(this.mileageDataRecordDelete[i].indexNumbermileage == index){
                let indexMaintenance = this.mileageDataRecordDelete.indexOf(this.mileageDataRecordDelete[i]);
                this.mileageDataRecordDelete.splice(indexMaintenance,1);
                this.mileageDataService.savemileageitems(this.mileageDataRecordDelete);
              }
            }
          }
          if(this.finalDataRecordDelete != 0){
            for(let i = 0;i<this.finalDataRecordDelete.length;i++){
              if(this.finalDataRecordDelete[i].currrentIndex == index){
                let indexMaintenance = this.finalDataRecordDelete.indexOf(this.finalDataRecordDelete[i]);
                this.finalDataRecordDelete.splice(indexMaintenance,1);
                this.finalDataService.saveFinalData(this.finalDataRecordDelete);
              }
            }
          }
          if(this.yearDataRecordDelete != 0){
            for(let i = 0;i<this.yearDataRecordDelete.length;i++){
              if(this.yearDataRecordDelete[i].indexNumbermileage == index){
                let indexMaintenance = this.yearDataRecordDelete.indexOf(this.yearDataRecordDelete[i]);
                this.finalDataRecordDelete.splice(indexMaintenance,1);
                this.yearDataService.saveFinalData(this.yearDataRecordDelete);
              }
            }
          }
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          alert.dismiss();
        }
      }
      ]
    });
    alert.present();
  }
}
