import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingDataProvider {

  settingstoringdata
  constructor(public storage: Storage)
  {
    console.log('Hello SettingDataProvider Provider');
  }


  getdata()
  {
   return this.storage.get('settingdata');
  }


  savetoStorage(settingdata)
  {
   this.settingstoringdata = JSON.stringify(settingdata);
   this.storage.set('settingdata', this.settingstoringdata);
   console.log('this is setting data' + settingdata );
  }
}
