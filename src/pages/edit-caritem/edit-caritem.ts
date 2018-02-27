import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';

/**
 * Generated class for the EditCaritemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-caritem',
  templateUrl: 'edit-caritem.html',
})
export class EditCaritemPage {
  carMake;
  carModel;
  carYear;
  carMileage;
  carItems;
  public carItem;

  Make;
  Model;
  Year;
  Mileage;
  index;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public cardetailservice: CarDataProvider) {
    this.index = this.navParams.get('index');
    console.log("index on edit car item page = " + this.index)
    this.carItem = this.navParams.get('carItem')
    console.log("car detail  on edit car item page = " + this.carItem)

      if(this.carMake == null){
        this.carMake = this.carItem.carMake;
      }
      if(this.carYear == null){
        this.carYear = this.carItem.carYear;
      }
      if(this.carMileage == null){
        this.carMileage = this.carItem.carMileage;
      }
      if(this.carModel == null){
        this.carModel = this.carItem.carModel;
      }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCaritemPage');
  }
  saveitems(){
    let dataOn = {

      carMake: this.carMake,
      carYear: this.carYear,
      carModel: this.carModel,
      carMileage: this.carMileage
    }

    this.viewCtrl.dismiss(dataOn);
  }

}
