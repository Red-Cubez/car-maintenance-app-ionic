import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the FinalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FinalDataProvider {
newdata;
  constructor(public storage: Storage) {
    console.log('Hello FinalDataProvider Provider');
  }



  getdata()
  {
   return this.storage.get('finaldata');
  
  }


  save(finalitems)
  {
   this.newdata = JSON.stringify(finalitems);
   this.storage.set('finaldata', this.newdata);
   console.log('final data here' , finalitems);

   

  }

}
