
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MaintenanceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaintenanceDataProvider {
  newMaintenanceData;
  
  constructor( public storage: Storage) {
    console.log('Hello MaintenanceDataProvider Provider');
  }

  getdata(){
    return this.storage.get('maintenanceData');
  }

  savemaintenace(maintenanceDataItems){
    this.newMaintenanceData = JSON.stringify(maintenanceDataItems);
    this.storage.set('maintenanceData', this.newMaintenanceData);
    console.log('this is data here' , maintenanceDataItems);
  }
}
