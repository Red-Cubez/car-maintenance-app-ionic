import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, Events, AlertController, ViewController } from 'ionic-angular';
import { AddItemPage} from '../add-item/add-item';
import { CarDetailPage } from '../car-detail/car-detail';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingsPage } from '../settings/settings';
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
  
  constructor(public viewCtrl: ViewController,public mileageDataService: MileageDataProvider,public maintenanceDataService: MaintenanceDataProvider,public alertCtrl: AlertController,public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public events: Events, public dataService: CarDataProvider){
    //getting car data 
    this.dataService.getdata().then((carData) =>{
      this.CarItems = JSON.parse(carData);
      console.log("Car Items in list - " + this.CarItems);
      console.log('this is it ' + carData)
      for(let caritem of this.CarItems){
        let index = this.CarItems.indexOf(caritem)
        console.log("index of car item = " + index);
      }
      
    });
    this.maintenanceDataService.getdata().then((maintenanceData) =>{
      this.maintenanceRecordDelete = JSON.parse(maintenanceData);
      
      console.log("Maintenance Data on Home Page - " + this.maintenanceRecordDelete);
    });
    this.mileageDataService.getdata().then((mileageData) =>{
      this.mileageDataRecordDelete = JSON.parse(mileageData);
      console.log("Mileage Data on Home Page - " + this.maintenanceRecordDelete);
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
  
  delete(carItem){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete the selected Car Data?',
      buttons: [{
        text: 'Delete',
        handler: () =>{
          let index;
          if(this.CarItems != null){
            index = this.CarItems.indexOf(carItem);
            if(index > -1){
              for(let carItem of this.CarItems){
                this.CarItems.splice(index, 1);
              this.dataService.save(this.CarItems);
              }
             
                
              if(this.maintenanceRecordDelete != null){
                for(let i =0; i<this.maintenanceRecordDelete.length;i++){
                  if(this.maintenanceRecordDelete[i].indexonMaintenance == index){
                     this.finalMaintenance.push(this.maintenanceRecordDelete[i]);
                  }
                }
                for(let final of this.maintenanceRecordDelete){
                  let indexMaintenance = this.maintenanceRecordDelete.indexOf(final);
                  if(final.indexonMaintenance == index){
                    console.log("Maintenance Record before"+ this.maintenanceRecordDelete);
                    console.log("Maintenance Index" + indexMaintenance);
                    this.maintenanceRecordDelete.splice(indexMaintenance,1);
                    console.log("Maintenance Record after"+ this.maintenanceRecordDelete);
                    this.maintenanceDataService.savemaintenace(this.maintenanceRecordDelete); 
                  }  
                }
              } 
              if(this.mileageDataRecordDelete != null){
                for(let i=0;i<this.mileageDataRecordDelete.length;i++){
                  if(this.mileageDataRecordDelete[i].indexNumbermileage == index){
                    this.finalMileage.push(this.mileageDataRecordDelete[i]);
                  }
                }
                for(let final of this.finalMileage){
                  let indexMileage = this.finalMileage.indexOf(final);
                  console.log("Mileage Record before"+ this.maintenanceRecordDelete);
                  console.log("Mileage Index" + indexMileage);
                  this.finalMileage.splice(indexMileage,1);
                  console.log("Mileage Record after"+ this.finalMileage);
                  this.mileageDataService.savemileageitems(this.finalMileage);
                  console.log("Mileage record deleted ")
                }
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
    }]
    });
    alert.present();
  
  }
}
