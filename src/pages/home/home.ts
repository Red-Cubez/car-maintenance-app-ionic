import { Component, ViewChild  } from '@angular/core';
import { NavController,ModalController, NavParams, Events, AlertController, ViewController,Content } from 'ionic-angular';
import { AddItemPage} from '../add-item/add-item';
import { CarDetailPage } from '../car-detail/car-detail';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingsPage } from '../settings/settings';
import { RelationDataProvider } from '../../providers/relation-data/relation-data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
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
  public finalMaintenance: any = [];
  public finalMileage: any = [];
  public relationArray: any = [];
  public relationdataToDelete = [];
  numberOfRelation;
  tempValue;
  
  
  constructor(public relationService: RelationDataProvider,public viewCtrl: ViewController,public mileageDataService: MileageDataProvider,public maintenanceDataService: MaintenanceDataProvider,public alertCtrl: AlertController,public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public events: Events, public dataService: CarDataProvider){
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
    this.relationService.getdata().then((relationData) =>{
      this.relationdataToDelete = JSON.parse(relationData);
      console.log("relation Data on Home Page - " + this.relationdataToDelete);

    });
   
  }
  ionViewWillEnter() {
    console.log( 'calling now - ionViewWillEnter ' );
    this.dataService.getdata().then((carData) =>{
      this.CarItems = JSON.parse(carData);
      console.log("Car Items in list - " + this.CarItems);
      console.log('this is it ' + carData)
      
    });


  }
 

  ionViewDidLoad() {
    console.log( 'calling now - ViewDidLoad ' );
    if(this.CarItems == null){ 
      // do nothing if car items are not set
    }
  }
  
  //jump to setting page
  gotoSettingPage(){
    this.navCtrl.push(SettingsPage);
  }
  
  //jump to add items page
  gotoadditempage(){
    let modal = this.modalCtrl.create(AddItemPage);
    modal.onDidDismiss((carItem) =>{
      if(carItem != null){
        this.save(carItem)
        console.log("when items not null - received : " + carItem.carMake);
       //window.location.reload();
        console.log("after callling relation function : " + this.relationdataToDelete);

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
    let index = this.CarItems.indexOf(carItem)
    if(this.relationdataToDelete != null){
      let lngth = this.relationdataToDelete.length;
      if(lngth == 0){
        let relationOfCars = {
          carName: carItem.carMake,
          carIndex: index,
          relationNumber: 2
        }
        this.relationdataToDelete.push(relationOfCars);
        this.relationService.save(this.relationdataToDelete);
        console.log("relation array  = " + this.relationdataToDelete);
        //this.navCtrl.setRoot(HomePage);

      }
      else{
        console.log("length of relation array  = " + length)
        this.tempValue = this.relationdataToDelete[lngth-1].relationNumber + 2;
        console.log("temp value of relation array  = " + this.tempValue)
        let relationOfCars = {
          carName: carItem.carMake,
          carIndex: index,
          relationNumber: this.tempValue
        }
        this.relationdataToDelete.push(relationOfCars);
        this.relationService.save(this.relationdataToDelete);
        //this.navCtrl.setRoot(HomePage);
      }
    }
    else{
      let relationOfCars = {
        carName: carItem.carMake,
        carIndex: index,
        relationNumber: 2
      }
      this.relationdataToDelete = [];
      this.relationdataToDelete.push(relationOfCars);
      this.relationService.save(this.relationdataToDelete);
      console.log("relation array  = " + this.relationdataToDelete);
     // this.navCtrl.setRoot(this.navCtrl.getActive().component)
    }
    console.log("index in save function = " + this.relationArray);
   // console.log("index in save function = " + relationOfCars.carIndex + "  " + relationOfCars.relationNumber);
  }
  // save detting data in setting-data provider
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
            index = this.CarItems.indexOf(carItem);
            indexLength = this.CarItems.length;
            if(index > -1){
              for(let i=0; i<this.CarItems.length;i++){
                if(i == index){
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
                if(this.relationdataToDelete[i].carIndex == index){
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
                for(let final of this.maintenanceRecordDelete){
                  if(final.indexonMaintenance == this.numberOfRelation){
                    let indexOfMaintenance = this.maintenanceRecordDelete.indexOf(final)
                    console.log("Maintenance Record before"+ this.maintenanceRecordDelete);
                    console.log("Maintenance Index" + indexOfMaintenance);
                    this.maintenanceRecordDelete.splice(indexOfMaintenance,1);
                    console.log("Maintenance Record after"+ this.maintenanceRecordDelete);
                    this.maintenanceDataService.savemaintenace(this.maintenanceRecordDelete); 
                  }  
                }
              }
              if(this.mileageDataRecordDelete != null){
                for(let final of this.mileageDataRecordDelete){
                  if(final.indexNumbermileage == this.numberOfRelation){
                    let indexMileage = this.mileageDataRecordDelete.indexOf(final);
                    console.log("Mileage Record before"+ this.maintenanceRecordDelete);
                    console.log("Mileage Index" + indexMileage);
                    this.mileageDataRecordDelete.splice(indexMileage,1);
                    console.log("Mileage Record after"+ this.mileageDataRecordDelete);
                    this.mileageDataService.savemileageitems(this.mileageDataRecordDelete);
                    console.log("Mileage record deleted ")
                  }
                }
              }  
            } 
          } 
          this.navCtrl.setRoot(HomePage);
        }
      },
      {
        text: 'Cancel',
        handler: () => {
        this.navCtrl.setRoot(HomePage);
        
      }
    }]
    });
    alert.present();
   
  }
}
