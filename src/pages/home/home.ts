import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, Events, AlertController, ViewController, Content } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingsPage } from '../settings/settings';
import { AddItemPage } from '../add-item/add-item';
import { EditCaritemPage } from '../edit-caritem/edit-caritem';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  carData = [];
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public carDataProvider: CarDataProvider, private fba: FirebaseAnalytics) {
  }
  ionViewWillEnter() {
    this.carDataProvider.getCardata().then(res => {
      this.carData = res;
    })
  }


  ionViewDidLoad() {
    this.fba.logEvent('HomePage', { pram: 'paramValueHome' }).then((res) => {
      console.log('result firebase = ' + res)
    }).catch(err => {
      console.log('error firebase = ' + err)
    });
  }

  //jump to setting page
  gotoSettingPage() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }

  gotoAddRecordPage() {
    let modal = this.modalCtrl.create(AddItemPage);
    modal.onDidDismiss(() => {
      this.carDataProvider.getCardata().then(res => {
        this.carData = res;
      })
    })
    modal.present();
  }

  editRecord(car) {
    let index = this.carData.indexOf(car);
    let model = this.modalCtrl.create(EditCaritemPage, {
      carItemIndex: index
    });
    model.onDidDismiss(() => {
      this.carDataProvider.getCardata().then(res => {
        this.carData = res;
      })
    })
    model.present();
    console.log('car = ' + car);

  }
}
