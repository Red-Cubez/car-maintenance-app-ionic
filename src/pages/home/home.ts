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
   
   
  }
  ionViewWillEnter() {
    console.log( 'calling now - ionViewWillEnter ' );
    this.dataService.getdata().then((carData) =>{
      this.CarItems = JSON.parse(carData);
      console.log("Car Items in list - " + this.CarItems);
      console.log('this is it ' + carData);
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
}
