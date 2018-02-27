import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingDataProvider {
  newSettingData;

  constructor(public storage: Storage) {
    console.log('Hello SettingDataProvider Provider');
  }

  getdata(){
    return this.storage.get('settingData');
  }

  saveSettingData(settingItem) {
    this.newSettingData = JSON.stringify(settingItem);
    this.storage.set('settingData', this.newSettingData);
    console.log('this is data here' , this.newSettingData);
  }

}
