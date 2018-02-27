
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the MileageDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MileageDataProvider {
  newMileageData;
 
  constructor(  public storage: Storage) {
    console.log('Hello MileageDataProvider Provider');
  }

  getdata(){
    return this.storage.get('mileageData');
  }

  savemileageitems(mileageItemData) {
    this.newMileageData = JSON.stringify(mileageItemData);
    this.storage.set('mileageData', this.newMileageData);
    console.log('this is data here' , mileageItemData);
  }
}
