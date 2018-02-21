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
  CarYear;
  carMileage;
  carItems;

  Make;
  Model;
  Year;
  Mileage;
  index;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public cardetailservice: CarDataProvider) {
    this.index - this.navParams.get('indexOn');
    this.cardetailservice.getdata().then((carData) =>{
      this.carItems = JSON.parse(carData);
      // this.carMake = this.carItems[this.index].carMake;
      // this.carModel = this.carItems[this.index].carModel;
      // this.CarYear = this.carItems[this.index].CarYear;
      // this.carMileage = this.carItems[this.index].carMileage;

    //  console.log(this.carItems[this.index].carMake);

      if(this.Make == null){
        this.Make = this.carMake;
      }
      if(this.Year == null){
        this.Year = this.CarYear;
      }
      if(this.Mileage == null){
        this.Mileage = this.carMileage;
      }
      if(this.Model == null){
        this.Model = this.carModel;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCaritemPage');
  }
  saveitems(){
    let dataOn = {

      carMake: this.Make,
      CarYear: this.Year,
      carModel: this.carModel,
      carMileage: this.carMileage
    }

    this.viewCtrl.dismiss(dataOn);
  }

}
