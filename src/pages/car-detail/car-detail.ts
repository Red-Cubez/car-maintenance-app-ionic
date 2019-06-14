import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController,ViewController } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { ReportPage } from '../report/report';
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

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public events: Events, public cardetailservice: CarDataProvider,  public modelCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailPage');
   }

  

}
