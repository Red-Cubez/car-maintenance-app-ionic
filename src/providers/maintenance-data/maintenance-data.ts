
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the MaintenanceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaintenanceDataProvider {
newmaintenancedata;
  constructor( public storage: Storage) 
  {
   console.log('Hello MaintenanceDataProvider Provider');
  }


  getdata()
  {
   return this.storage.get('maintenancedata');
  }


  savemaintenace(maintenancedataitems)
  {
   this.newmaintenancedata = JSON.stringify(maintenancedataitems);
   this.storage.set('maintenancedata', this.newmaintenancedata);
   console.log('this is data here' , maintenancedataitems);
  }
}
