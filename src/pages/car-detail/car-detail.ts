import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController,ViewController } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { ReportPage } from '../report/report';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingsPage } from '../settings/settings';
import { EditCaritemPage } from '../edit-caritem/edit-caritem';
import { HomePage } from '../home/home';

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
  public carItem;
  index;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public cardetailservice: CarDataProvider, public mileageprovider: MileageDataProvider,  public maintenanceprovider: MaintenanceDataProvider, public modelCtrl: ModalController) {
    this.carItem = this.navParams.get('CarItem');
    this.index = this.navParams.get('index');
    if(this.carItem == null){
      console.log("received null car item on details page");
    }
    else{
      console.log("received car item on details page - " + this.carItem);
    }
    console.log("current car item : " + this.carItem.carMake);
    console.log("current car index : " + this.index);
    this.cardetailservice.getdata().then((carData)=>{
      this.caritemsdetail = JSON.parse(carData);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailPage');
   }

  // go to mileage detail page
  gotogasmileagedetail(){
    let sendIndex ={
      indexSended: this.index,
    }
    this.navCtrl.push(GasMileageDetailPage, sendIndex);
  }

  // go to maintenance detail page  
  gotomaintenancecostdetailpage(){
    let sendIndex ={
      indexSending: this.index,
    }
    this.navCtrl.push(MaintenanceCostDetailPage, sendIndex);
  }

  // go to report page
  gotoreportpage(){
    let sendIndex ={
      indexSending: this.index,
      carName: this.carItem.carMake,
    }
   this.navCtrl.push(ReportPage, sendIndex);
  }
  gotoSettingPage(){
    this.navCtrl.push(SettingsPage);
  }
  editCarItem(){
    let modal = this.modelCtrl.create(EditCaritemPage,{
      index: this.index,
      carItem: this.carItem
    });
    modal.onDidDismiss(dataOn => {
      if(dataOn != undefined){
        this.carItem = dataOn;
        this.caritemsdetail[this.index] = dataOn;
        this.cardetailservice.save(this.caritemsdetail);
      }
    });
    modal.present();
  }

}
