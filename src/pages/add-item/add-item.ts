import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  carMake: string;
  carYear: number;
  carModel: string;
  carMileage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public vewiCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage'); 
  }

  gotohomepage()
{
  this.navCtrl.pop();
}

saveitems(){
  if((this.carMake == null) || (this.carMake == "") || (this.carMake == " ") ){

  }else{
    let carItem ={
    
      carMake: this.carMake,
      carYear:this.carYear,
      carModel: this.carModel,
      carMileage: this.carMileage

    };

    console.log("car make, year, model, mileage: " + this.carMake + this.carYear + this.carModel + this.carMileage  );  
    // this.events.publish('adding:items', items);
    console.log("Setting up Car Item - " + carItem.carMake);
    this.vewiCtrl.dismiss(carItem);
  }
}

}
