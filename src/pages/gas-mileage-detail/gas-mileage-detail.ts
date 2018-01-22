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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public mileageservice: MileageDataProvider) {
 
 this.mileageservice.getdata().then((mileagedata) =>{

this.mileageitemssave = JSON.parse(mileagedata);

 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GasMileageDetailPage');
  }
  gotosetgasmileage(){

    let modal = this.modalCtrl.create(SetGasMileagePage);

    modal.onDidDismiss(mileageitems =>{
if(mileageitems){
      this.savemileageitems(mileageitems);
}
    });

    modal.present();
      }
 savemileageitems(mileageitems){
this.mileageitemssave = mileageitems;
this.mileageservice.savemileageitems(this.mileageitemssave);
      }
}
