import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, Events } from 'ionic-angular';
import { AddItemPage} from '../add-item/add-item';
import { SettingsPage } from '../settings/settings';
import { CarDetailPage } from '../car-detail/car-detail';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';

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
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public events: Events, public dataService: CarDataProvider, public settingservice: SettingDataProvider){
    //getting car data 
    this.dataService.getdata().then((carData) =>{
      this.CarItems = JSON.parse(carData);
      console.log("Car Items in list - " + this.CarItems);
      console.log('this is it ' + carData)
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
    this.settingsData = dataSetting;
    this.settingservice.savetoStorage(this.settingsData);
    console.log( 'setting data ' + dataSetting);
  }
}
