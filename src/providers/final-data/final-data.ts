import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the FinalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FinalDataProvider {
  newData;
  constructor(public storage: Storage) {
    console.log('Hello FinalDataProvider Provider');
  }

  getdata(){
    return this.storage.get('finalData');
  }
  
  save(finalItems){
    this.newData = JSON.stringify(finalItems);
    this.storage.set('finalData', this.newData);
    console.log('final data here' , finalItems);
  }

}
