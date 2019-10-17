
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


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
  constructor(public storage: Storage) {
    console.log('Hello CarDataProvider Provider');
  }

  getCardata() {
    return this.storage.get('carData');
  }

  saveCarData(items) {
    this.newCarData = items;
    this.storage.set('carData', this.newCarData);
    console.log('this is car data', items);
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
}
