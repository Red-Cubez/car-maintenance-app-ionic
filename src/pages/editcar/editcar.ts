import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingsPage } from "../settings/settings";

/**
 * Generated class for the EditcarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcar',
  templateUrl: 'editcar.html',
})
export class EditcarPage {

  indexOfRecord;
  carData = [];
  carMake;
  carModel;
  carYear;
  carMileage;
  buttonClicked = false;
  hideMe = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardDataProvider: CarDataProvider, public viewCtrl: ViewController,public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('index == ' + this.cardDataProvider.getindex());
    this.indexOfRecord = this.cardDataProvider.getindex();

    console.log('car data == ' + JSON.stringify(this.cardDataProvider.getCardata()));
    this.cardDataProvider.getCardata().then(res => {
      this.carData = res;
      this.carMake = this.cardDataProvider.getmake();
      console.log('DATA1 == ' + this.carMake);

      this.carModel = this.cardDataProvider.getmodel();
      console.log('DATA1 == ' + this.carModel);

      this.carYear = this.cardDataProvider.getyear();
      console.log('DATA1 == ' + this.carYear);

      this.carMileage = this.cardDataProvider.getmileage();
      console.log('DATA1 == ' + this.carMileage);
    })

    console.log('ionViewDidLoad EditCarPage');
  }
  dismissing() {
    this.viewCtrl.dismiss();
  }

    //jump to setting page
    gotoSettingPage() {
      let modal = this.modalCtrl.create(SettingsPage);
      modal.present();
    }

    editInformation(){
      this.buttonClicked = true;
      if (this.carMake != undefined && this.carMake != '' && this.carModel != undefined && this.carModel != '' && this.carYear != undefined && this.carYear != '' && this.carMileage != undefined && this.carMileage != '') {
        
        this.carMake = this.carMake[0].toUpperCase() + this.carMake.slice(1);
        this.carModel = this.carModel[0].toUpperCase() + this.carModel.slice(1);
        let data = {
          carMake: this.carMake,
          carModel: this.carModel,
          carYear: this.carYear,
          carMileage: this.carMileage,
          carMaintenanceDetail: this.carData[this.indexOfRecord].carMaintenanceDetail,
          carMileageDetail: this.carData[this.indexOfRecord].carMileageDetail
        }
        if (this.carData == null) {
          this.carData = [];
        }
        this.carData[this.indexOfRecord] = data;
        this.cardDataProvider.saveCarData(this.carData);
        // alert('Record updated Successfully!')
        this.cardDataProvider.presentToast('Record updated successfully!');
        this.viewCtrl.dismiss();
      }
      else{
        alert("Please fill all enteries")
      }
    }
  


}
