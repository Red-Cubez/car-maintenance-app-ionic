
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the MileageDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MileageDataProvider {
newmileagedata;
  constructor(  public storage: Storage) 
  {
    console.log('Hello MileageDataProvider Provider');
  }


  getdata()
  {
   return this.storage.get('mileagedata');
  }


  savemileageitems(mileageitemdata)
  {
   this.newmileagedata = JSON.stringify(mileageitemdata);
   this.storage.set('mileagedata', this.newmileagedata);
   console.log('this is data here' , mileageitemdata);
  }
}
