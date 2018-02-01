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

  mileageitemssave = [];
  public indexonMileage;
public settingdataarr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public mileageservice: MileageDataProvider,public setteingservice: SettingDataProvider) 
  {
    let datam: any = {
    
      currencyPrefernce: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
    this.setteingservice.getdata().then((settingdata) =>{
      this.settingdataarr = JSON.parse(settingdata);
      if (this.settingdataarr == null){

        this.settingdataarr = datam;
  
        console.log("default setting value = " + this.settingdataarr)
      }
          });
          console.log('setting data on setting page - ' + this.settingdataarr);

          this.mileageservice.getdata().then((finaldata) => {
            this.mileageitemssave = JSON.parse(finaldata);
            console.log('final data on mileage detail page =  ' + this.mileageitemssave);
           });

       this.indexonMileage = this.navParams.get('indexSended');
       console.log('index on mileage page - ' + this.indexonMileage);
  
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad GasMileageDetailPage');
  }

  // go  to mileage setting page
  gotosetgasmileage()
  {
  let modal = this.modalCtrl.create(SetGasMileagePage);
  modal.onDidDismiss(mileageitems =>{
  if(mileageitems != null){

    let data = {

      indexNumbermileage: this.indexonMileage,
      mileageDate: mileageitems.mileageDate,
      mileageFuel: mileageitems.mileageFuel
    }
      this.savemileageitems(data);
  } // end if
  });
     modal.present();
  }


  // setting maileage data to milage provider
  savemileageitems(mileageitems)
  {

    if(this.mileageitemssave == null){

      this.mileageitemssave = [];
    }
   
   this.mileageitemssave.push(mileageitems);
   this.mileageservice.savemileageitems(this.mileageitemssave);
  }
}
