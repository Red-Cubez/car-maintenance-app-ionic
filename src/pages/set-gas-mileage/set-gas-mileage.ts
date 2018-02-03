import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
/**
 * Generated class for the SetGasMileagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-gas-mileage',
  templateUrl: 'set-gas-mileage.html',
})
export class SetGasMileagePage {


  mileageDate:any;
  mileageFuel: string;
  mileageCost: string
  public settingDataarr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public setteingService: SettingDataProvider){
    let datam: any = {
      currencyPrefernce: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
    this.setteingService.getdata().then((settingData) =>{
      this.settingDataarr = JSON.parse(settingData);
      if (this.settingDataarr == null){
        this.settingDataarr = datam;
        console.log("default setting value = " + this.settingDataarr)
      }
    });
    console.log('setting data on setting page - ' + this.settingDataarr);
  
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad SetGasMileagePage');
  }


  // setting gas mileage data to array
  setgasmileagesetting(){
    if((this.mileageDate == null) || (this.mileageDate == "") || (this.mileageDate == " " ) ){
      // di nothing if gasmileage date is empty
    } // end if
    else{
      let mileageItems = {
        mileageDate: this.mileageDate,
        mileageFuel: this.mileageFuel,
        mileageCost: this.mileageCost
      };
      this.viewCtrl.dismiss(mileageItems);
    } // end else
  }
}
