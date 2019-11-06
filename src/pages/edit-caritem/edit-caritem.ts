import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { ReportPage } from '../report/report';
import { SettingsPage } from "../settings/settings";
import { EditcarPage } from "../editcar/editcar";

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
    console.log('index == ' + this.navParams.get('carItemIndex'));
    this.indexOfRecord = this.navParams.get('carItemIndex');
    this.cardDataProvider.setindex(this.indexOfRecord);
  

    console.log('car data == ' + JSON.stringify(this.cardDataProvider.getCardata()));
    this.cardDataProvider.getCardata().then(res => {
      this.carData = res;
      this.carMake = this.carData[this.indexOfRecord].carMake;
      console.log('DATA == ' + this.carMake);
      this.cardDataProvider.setmake(this.carMake);

      this.carModel = this.carData[this.indexOfRecord].carModel;
      console.log('DATA == ' + this.carModel);
      this.cardDataProvider.setmodel(this.carModel);

      this.carYear = this.carData[this.indexOfRecord].carYear;
      console.log('DATA == ' + this.carYear);
      this.cardDataProvider.setyear(this.carYear);

      this.carMileage = this.carData[this.indexOfRecord].carMileage;
      console.log('DATA == ' + this.carMileage);
      this.cardDataProvider.setmileage(this.carMileage);
    })

    console.log('ionViewDidLoad EditCaritemPage');
  }
  dismissing() {
    this.viewCtrl.dismiss();
  }

    //jump to setting page
    gotoSettingPage() {
      let modal = this.modalCtrl.create(SettingsPage);
      modal.present();
    }

  gotoAddMaintenanceRecordPage(){
    let modal = this.modalCtrl.create(MaintenanceCostDetailPage,{
      indexOfRecord: this.indexOfRecord
    });
    modal.present();
  }
  gotoAddMileageRecordPage(){
    let modal = this.modalCtrl.create(GasMileageDetailPage,{
      indexOfRecord: this.indexOfRecord
    });
    modal.present();
  }
  gotoReportRecordPage(){
    let modal = this.modalCtrl.create(ReportPage,{
      indexOfRecord: this.indexOfRecord
    });
    modal.present();
  }
  gotoEditCarPage(){
    let modal = this.modalCtrl.create(EditcarPage,{
      indexOfRecord: this.indexOfRecord
    });
    modal.present();
  }

  hide() {
    if(this.hideMe == false)
    {
      this.hideMe = true;
    }
    else
    if(this.hideMe == true)
    {
      this.hideMe = false;
    }
   
  }
}
