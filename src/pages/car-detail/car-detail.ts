import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController,ViewController,AlertController,Content } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { ReportPage } from '../report/report';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingsPage } from '../settings/settings';
import { EditCaritemPage } from '../edit-caritem/edit-caritem';
import { HomePage } from '../home/home';
import { RelationDataProvider } from '../../providers/relation-data/relation-data';

/**
 * Generated class for the CarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage {
  @ViewChild(Content) content: Content;
  caritemsdetail = [];
  public carItem;
  index;
  public maintenanceRecordDelete: any= [];
  public mileageDataRecordDelete: any=[];
  public finalDataRecordDelete: any=[];
  public yearDataRecordDelete: any = [];
  public finalMaintenance: any = [];
  public finalMileage: any = [];
  public relationArray: any = [];
  public relationdataToDelete = [];
  public CarItems = [];
  vallue;
  numberOfRelation;
  tempValue;
  extraMaintenanceArray = [];
  extraMileageArray = [];

  constructor(public relationService: RelationDataProvider,public alertCtrl: AlertController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public dataService: CarDataProvider, public mileageDataService: MileageDataProvider,  public maintenanceDataService: MaintenanceDataProvider, public modelCtrl: ModalController) {
    this.carItem = this.navParams.get('CarItem');
    this.index = this.navParams.get('index');
    if(this.carItem == null){
      console.log("received null car item on details page");
    }
    else{
      console.log("received car item on details page - " + this.carItem);
    }
    console.log("current car item : " + this.carItem.carMake);
    console.log("current car index : " + this.index);
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
    this.relationService.getdata().then((relationData) =>{
      this.relationdataToDelete = JSON.parse(relationData);
      console.log("relation Data on Home Page - " + this.relationdataToDelete);

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailPage');
   }

  // go to mileage detail page
  gotogasmileagedetail(){
    let sendIndex ={
      indexSended: this.index,
    }
    this.navCtrl.push(GasMileageDetailPage, sendIndex);
  }

  // go to maintenance detail page  
  gotomaintenancecostdetailpage(){
    let sendIndex ={
      indexSending: this.index,
    }
    this.navCtrl.push(MaintenanceCostDetailPage, sendIndex);
  }
  ionViewWillEnter() {
    this.mileageDataService.getdata().then((mileageData) =>{
      this.mileageDataRecordDelete = JSON.parse(mileageData);
      console.log("Mileage Data on Home Page - " + this.mileageDataRecordDelete);
    });
    this.maintenanceDataService.getdata().then((maintenanceData) =>{
      this.maintenanceRecordDelete = JSON.parse(maintenanceData);
      
      console.log("Maintenance Data on Home Page - " + this.maintenanceRecordDelete);
    });
   
  }

  // go to report page
  gotoreportpage(){
    let sendIndex ={
      indexSending: this.index,
      carName: this.carItem.carMake,
    }
   this.navCtrl.push(ReportPage, sendIndex);
  }
  gotoSettingPage(){
    this.navCtrl.push(SettingsPage);
  }
  editCarItem(){
    let modal = this.modelCtrl.create(EditCaritemPage,{
      index: this.index,
      carItem: this.carItem
    });
    modal.onDidDismiss(dataOn => {
      if(dataOn != undefined){
        this.carItem = dataOn;
        this.CarItems[this.index] = dataOn;
        this.dataService.save(this.CarItems);
      
      }
      else{
        this.CarItems[this.index] = this.carItem;
        this.dataService.save(this.CarItems);
      }
    });

    modal.present();
  }

  delete(carItem){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete the selected Car Data?',
      buttons: [{
        text: 'Delete',
        handler: () =>{
          let index;
          let indexLength;
          if(this.CarItems != null){
            //index = this.CarItems.indexOf(carItem);
            indexLength = this.CarItems.length;
            if(this.index > -1){
              for(let i=0; i<this.CarItems.length;i++){
                if(i == this.index){
                  this.CarItems.splice(index, 1)
                  this.dataService.save(this.CarItems);
                }
              }
            } 

            if(this.relationdataToDelete != null){
              let allIndex = this.relationdataToDelete.length;
              let allindexOn = allIndex-1;
              console.log('all index =  ' + allindexOn);
              for(let i=0; i<this.relationdataToDelete.length;i++){
                if(this.relationdataToDelete[i].carIndex == this.index){
                  let indexOn = this.relationdataToDelete.indexOf(this.relationdataToDelete[i])
                  this.numberOfRelation = this.relationdataToDelete[i].relationNumber;
                  if(indexOn < allindexOn){
                    //console.log(" before delete relation = " + this.relationdataToDelete[i].carIndex);
                    this.relationdataToDelete.splice(i,1);
                   // console.log(" after delete relation = " + this.relationdataToDelete[i].carIndex);
                    this.relationdataToDelete[i].carIndex = indexOn;
                    //console.log(" setting index on value = " + this.relationdataToDelete[i].carIndex);
                    this.relationService.save(this.relationdataToDelete);
                  }
                  else{
                   // console.log(" before delete relation = " + this.relationdataToDelete[i].carIndex);
                    this.relationdataToDelete.splice(i,1);
                    //console.log(" after delete relation = " + this.relationdataToDelete[i].carIndex);
                    //console.log(" setting index on value = " + this.relationdataToDelete[i].carIndex);
                    this.relationService.save(this.relationdataToDelete);

                  }
                }
              }
              if(this.maintenanceRecordDelete != null){
                for(let i = 0;i<this.maintenanceRecordDelete.length;i++){
                  if(this.maintenanceRecordDelete[i].indexonMaintenance == this.numberOfRelation){
                    this.extraMaintenanceArray.push(this.maintenanceRecordDelete.indexOf(this.maintenanceRecordDelete[i]));
                  }  
                }
                for(let i =0; i<this.extraMaintenanceArray.length;i++){
                  let indeOOn = this.extraMaintenanceArray[i];
                  this.maintenanceRecordDelete.splice(indeOOn);
                }
                this.maintenanceDataService.savemaintenace(this.maintenanceRecordDelete);
              }
              if(this.mileageDataRecordDelete != null){
                for(let i=0;i<this.mileageDataRecordDelete.length;i++){
                  if(this.mileageDataRecordDelete[i].indexNumbermileage == this.numberOfRelation){
                    this.extraMileageArray.push(this.mileageDataRecordDelete.indexOf(this.mileageDataRecordDelete[i]));
                  }
                }
                for(let i = 0;i<this.extraMileageArray.length;i++){
                  let indexOOnn = this.extraMileageArray[i];
                  this.mileageDataRecordDelete.splice(indexOOnn)
                }
                this.mileageDataService.savemileageitems(this.mileageDataRecordDelete);
              }  
            } 
          } 
          this.navCtrl.setRoot(HomePage);
        }
      },
      {
        text: 'Cancel',
        handler: () => {
        
        
      }
    }]
    });
    alert.present();
   
  }

}
