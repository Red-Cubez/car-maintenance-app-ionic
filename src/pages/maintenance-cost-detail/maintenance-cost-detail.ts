import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';

/**
 * Generated class for the MaintenanceCostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-cost-detail',
  templateUrl: 'maintenance-cost-detail.html',
})
export class MaintenanceCostDetailPage {

  maintenancedataitems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceservice: MaintenanceDataProvider) {
 
 this.maintenanceservice.getdata().then((maintenancedata) => {

this.maintenancedataitems = JSON.parse(maintenancedata);
 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaintenanceCostDetailPage');
  }

gotosetmaintenancecost(){

  let modal = this.modalCtrl.create(SetMaintenanceCostPage);

  modal.onDidDismiss(maintenanceitems =>{
    if(maintenanceitems){

    this.savemaintenance(maintenanceitems);
    }
  });

  modal.present();
}
savemaintenance(maintenacedata){

  this.maintenancedataitems = maintenacedata;
  this.maintenanceservice.savemaintenace(this.maintenancedataitems);


}


}
