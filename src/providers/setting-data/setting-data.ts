import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingDataProvider {

  settingStoringData;
  
  constructor(public storage: Storage){
    console.log('Hello SettingDataProvider Provider');
  }


  getdata(){
   return this.storage.get('settingData');
  }

  savetoStorage(settingData){
    this.settingStoringData = JSON.stringify(settingData);
    this.storage.set('settingdata', this.settingStoringData);
    console.log('this is setting data' + settingData );
  }
}
