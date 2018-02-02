import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the MaintenanceGraphProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaintenanceGraphProvider {
maintenancegraphdata;
  constructor(public storage: Storage) {
    console.log('Hello MaintenanceGraphProvider Provider');
  }
  getdata()
  {
   return this.storage.get('maintenancegraphdata');
  
  }


  savemaintenancegraph(items)
  {
   this.maintenancegraphdata = JSON.stringify(items);
   this.storage.set('maintenancegraphdata', this.maintenancegraphdata);
   console.log('this is car data' , items);
   

  }
}
