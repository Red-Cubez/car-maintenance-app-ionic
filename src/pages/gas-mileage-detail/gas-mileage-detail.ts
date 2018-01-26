import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SetGasMileagePage } from '../set-gas-mileage/set-gas-mileage';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public mileageservice: MileageDataProvider) 
  {
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
      this.savemileageitems(mileageitems);
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
   
   this.mileageitemssave = mileageitems;
   this.mileageservice.savemileageitems(this.mileageitemssave);
  }
}
