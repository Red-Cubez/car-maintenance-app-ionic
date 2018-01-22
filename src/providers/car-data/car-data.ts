
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the CarDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarDataProvider {
newcardata;
  constructor( public storage: Storage) {
    console.log('Hello CarDataProvider Provider');
  }


  getdata(){
return this.storage.get('cardata');

  }
  save(items){
this.newcardata = JSON.stringify(items);
this.storage.set('cardata', this.newcardata);

console.log('this is data here' , items);
  }

}
