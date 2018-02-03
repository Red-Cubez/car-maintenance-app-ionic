
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
  
  constructor( public storage: Storage){
    console.log('Hello CarDataProvider Provider');
  }

  getdata(){
    return this.storage.get('carData');
  }

  save(items){
    this.newCarData = JSON.stringify(items);
    this.storage.set('carData', this.newCarData);
    console.log('this is car data' , items);
  }
}
