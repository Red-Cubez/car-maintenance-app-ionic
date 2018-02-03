import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SetGasMileagePage } from '../set-gas-mileage/set-gas-mileage';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';

/**
 * Generated class for the GasMileageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gas-mileage-detail',
  templateUrl: 'gas-mileage-detail.html',
})
export class GasMileageDetailPage {

  mileageItemsSave = [];
  public indexonMileage;
  public settingDataarr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public mileageService: MileageDataProvider,public setteingService: SettingDataProvider) {
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
      this.mileageService.getdata().then((finaldata) => {
        this.mileageItemsSave = JSON.parse(finaldata);
        console.log('final data on mileage detail page =  ' + this.mileageItemsSave);
      });
      this.indexonMileage = this.navParams.get('indexSended');
      console.log('index on mileage page - ' + this.indexonMileage);
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad GasMileageDetailPage');
  }

  // go  to mileage setting page
  gotosetgasmileage(){
    let modal = this.modalCtrl.create(SetGasMileagePage);
    modal.onDidDismiss(mileageitems =>{
     if(mileageitems != null){
        let data = {
          indexNumbermileage: this.indexonMileage,
          mileageDate: mileageitems.mileageDate,
          mileageFuel: mileageitems.mileageFuel,
          mileageCost: mileageitems.mileageCost
        }
        this.savemileageitems(data);
      } // end if
    });
    modal.present();
  }


  // setting maileage data to milage provider
  savemileageitems(mileageItems){
    if(this.mileageItemsSave == null){
      this.mileageItemsSave = [];
    }
   this.mileageItemsSave.push(mileageItems);
   this.mileageService.savemileageitems(this.mileageItemsSave);
  }
}
