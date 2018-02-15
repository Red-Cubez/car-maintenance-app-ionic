import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the YearMaintenanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YearMaintenanceProvider {

  newData;
  constructor(public storage: Storage) {
    console.log('Hello FinalDataProvider Provider');
  }

  getdata(){
    return this.storage.get('yearFinalData');
  }
  
  saveFinalData(finalItems){
    this.newData = JSON.stringify(finalItems);
    this.storage.set('yearFinalData', this.newData);
    console.log('final data here' , finalItems);
  }


}
