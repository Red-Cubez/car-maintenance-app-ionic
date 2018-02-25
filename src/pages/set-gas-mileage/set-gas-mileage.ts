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
  mileageCost: string;
  public settingDataarr = [];
  public settingDataMileage: any = [];
  currentDate: string = new Date().toISOString();

  constructor(public settingService: SettingDataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController){
    let datam = {
      currencyType: 'Dollar',
      gasUnit: 'Litre',
      distanceUnit: 'KiloMeter'
    }
    this.settingService.getdata().then((settingData) =>{
      this.settingDataMileage = JSON.parse(settingData);
      if(this.settingDataMileage == null){
        this.settingDataMileage = datam;
      }
      if(this.settingDataMileage.gasUnit == undefined){
        this.settingDataMileage.gasUnit = datam.gasUnit;
      }
      if(this.settingDataMileage.currencyType == undefined){
        this.settingDataMileage.currencyType = datam.currencyType;
      }
      console.log('setting data on mileage page + ' + this.settingDataMileage.gasUnit);
    });
   
  
  
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
