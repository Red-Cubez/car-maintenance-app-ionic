import { Component } from '@angular/core';
import { NavController,ModalController, NavParams } from 'ionic-angular';
import { AddItemPage} from '../add-item/add-item';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
car;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams) {
this.car = "";
  }
  
  gotosettings(){

    this.navCtrl.push(SettingsPage);
  }
  gotoadditempage(){

    let modal = this.modalCtrl.create(AddItemPage);

    modal.onDidDismiss(items => {

this.car = items.carname;
console.log("received : " + items.carname);
    });
    modal.present();
  }

}
