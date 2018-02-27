import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ModalController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { SettingsPage } from '../settings/settings';
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
  currency;

  constructor(public modalCtrl: ModalController,public settingService: SettingDataProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController){
    let datam = {
      currencyType: 'USA-Dollar',
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
      if(this.settingDataMileage.currencyType == "USA-Dollar"){
        this.currency = '$';
      }
      if(this.settingDataMileage.currencyType == "British-Pound"){
        this.currency = '₤';
      }
      if(this.settingDataMileage.currencyType == "Canadian-Dollar"){
        this.currency = 'Can-$'
      }
      if(this.settingDataMileage.currencyType == "Pakistani-Ruppee"){
        this.currency = 'Rs'
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
        mileageCost: this.mileageCost,
        mileageYear: this.mileageDate.slice(0,4)
      };
      this.viewCtrl.dismiss(mileageItems);
    } // end else
  }
 
}
