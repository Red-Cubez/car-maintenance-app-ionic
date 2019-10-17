
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the CarDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarDataProvider {
  newCarData;
  currencytype;
  distanceUnit;
  gasUnit;
  manufactureDetail;
  consumptionDetail;
  local;
  indexNumber;
  make;
  model;
  year;
  mileage;

  constructor(public storage: Storage, public toastController: ToastController) {
    console.log('Hello CarDataProvider Provider');
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getCardata() {
    return this.storage.get('carData');
  }

  saveCarData(items) {
    this.newCarData = items;
    this.storage.set('carData', this.newCarData);
    console.log('this is car data', items);
  }

  resetCarData(){
    this.storage.remove('carData')
    // localStorage.removeItem("carData");
  }

  getcurrencytype() {
    return this.storage.get('currency');
  }
  setCurrencyType(settingItem) {
    this.currencytype = settingItem;
    this.storage.set('currency', this.currencytype);
    console.log('this is data here', this.currencytype);
  }

  getDistanceUnit() {
    return this.storage.get('distance');
  }
  setDistanceUnit(settingItem) {
    this.distanceUnit = settingItem;
    this.storage.set('distance', this.distanceUnit);
    console.log('this is data here', this.distanceUnit);
  }
  getGasUnit() {
    return this.storage.get('gas');
  }
  setGasUnit(settingItem) {
    this.gasUnit = settingItem;
    this.storage.set('gas', this.gasUnit);
    console.log('this is data here', this.gasUnit);
  }

  setmanufactureDetail(value) {
    this.manufactureDetail = value;
    this.storage.set('detailOfManufacture', this.manufactureDetail);
    console.log('manufacture detail in provider = ' + JSON.stringify(this.manufactureDetail))
  }
  getmanufactureDetail() {
    return this.storage.get('detailOfManufacture')
  }

  setconsumptionDetail(value) {
    this.consumptionDetail = value;
    this.storage.set('detailOfConsumption', this.consumptionDetail);
    console.log('consumption detail in provider = ' + JSON.stringify(this.consumptionDetail))
  }
  getconsumptionDetail() {
    return this.storage.get('detailOfConsumption')
  }

  /*-------------------Edit Data---------------------------*/

  setindex(index) 
  {
    localStorage.setItem('index',index);
  }
  getindex() 
  {
    return localStorage.getItem('index');
  }

  setmake(make) 
  {
    localStorage.setItem('make',make);
  }
  getmake() 
  {
    return localStorage.getItem('make');
  }

  setmodel(model) 
  {
    localStorage.setItem('model',model);
  }
  getmodel() 
  {
    return localStorage.getItem('model');
  }

  setyear(year) 
  {
    localStorage.setItem('year',year);
  }
  getyear() 
  {
    return localStorage.getItem('year');
  }

  setmileage(mileage)
  {
      localStorage.setItem('mileage',mileage);
  }
  getmileage()
  {
    return localStorage.getItem('mileage');
  }

}
