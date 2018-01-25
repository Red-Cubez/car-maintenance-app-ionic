import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,  } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { ReportPage } from '../report/report';

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
carItem;
index;


  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public cardetailservice: CarDataProvider) 
  {
    this.cardetailservice.getdata().then((cardata) =>
    {
    // getting cardata from provider
      this.caritemsdetail = JSON.parse(cardata);
    });
  }

  ionViewWillEnter() {

    this.carItem = this.navParams.get('CarItem');
    // this.personAge = this.navParams.get('PersonItem').personAge;
    // this.PrescriptionItems = this.navParams.get('PersonItem').PrescriptionItems;
    // this.MedicenItems = this.navParams.get('PersonItem').MedicenItems;
   
    // this.notificationDetails = this.navParams.get('notificationDetails');
    this.index = this.navParams.get('index');
  }




  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CarDetailPage');
  }

  // go to mileage detail page
  gotogasmileagedetail()
  {
   this.navCtrl.push(GasMileageDetailPage);
  }

  // go to maintenance detail page  
  gotomaintenancecostdetailpage()
  {
   this.navCtrl.push(MaintenanceCostDetailPage);
  }

  // go to report page
  gotoreportpage()
  {
   this.navCtrl.push(ReportPage);
  }
}
