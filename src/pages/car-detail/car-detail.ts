import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,  } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { CarDataProvider } from '../../providers/car-data/car-data';

/**
 * Generated class for the CarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage {
caritemsdetail = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public cardetailservice: CarDataProvider) {
   

    this.cardetailservice.getdata().then((cardata) =>{
this.caritemsdetail = JSON.parse(cardata);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailPage');


//     this.events.subscribe('adding:items', (items)=>{

// console.log(items);
//     });
  
  }


gotogasmileagedetail(){
  this.navCtrl.push(GasMileageDetailPage);
}

gotomaintenancecostdetailpage(){
  this.navCtrl.push(MaintenanceCostDetailPage);
}


}
