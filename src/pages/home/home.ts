import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, Events, AlertController, ViewController, Content } from 'ionic-angular';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { SettingsPage } from '../settings/settings';
import { AddItemPage } from '../add-item/add-item';
import { EditCaritemPage } from '../edit-caritem/edit-caritem';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  carData = [];
  customModal;
  should_show;
  currencyPreference;
  gasUnit;
  value = 0;
  indexOfRecord;

  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public carDataProvider: CarDataProvider, private fba: FirebaseAnalytics) {
  }
  ionViewWillEnter() {
    this.carDataProvider.getCardata().then(res => {
      this.carData = res;
      console.log('Car Data == ' + JSON.stringify(this.carData));

      if (this.carData != null) {
        this.should_show = 1;
      } else {
        this.should_show = 0;
      }
    });

    this.getCurrency_GasUnit();
  }

  getCurrency_GasUnit() {
    this.carDataProvider.getcurrencytype().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.currencyPreference = '$';
      }
      else {
        this.currencyPreference = res;
      }

    });

    this.carDataProvider.getGasUnit().then(res => {
      console.log('res = ' + res);
      if (res == null || res == undefined) {
        this.gasUnit = 'Litre(s)';
        console.log('gasUnit == ' + this.gasUnit);
      }
      else {
        this.gasUnit = res;
        console.log('gasUnit == ' + this.gasUnit);
      }
    });

    setTimeout(() => {
      console.log("RUN");
      this.getCurrency_GasUnit();
    }, 4000);
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
    this.customModal = modal;
    modal.onDidDismiss(() => {
      this.carDataProvider.getCardata().then(res => {
        this.carData = res;
      })
    })
    modal.present();
    this.should_show = 1;
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

  deleteRecord(value) {
    let index = this.carData.indexOf(value);
    console.log('index = ' + index);

    let alrt = this.alertCtrl.create({
      title: 'Delete Record',
      message: 'Do you want to delete ' + this.carData[index].carModel + '`s ' + 'record ?',
      buttons: [{
        text: 'No'
      }, {
        text: 'Yes',
        handler: () => {
          let ids = [];
          let pres = this.carData[index];
          console.log('pres = ' + pres)
          for (let i = 0; i < this.carData.length; i++) {
            if (i == index) {
              this.carData.splice(index, 1)
            }
          }
          console.log("Array Length == " + this.carData.length);
          if (this.carData.length != 0) {
            console.log('if')
            this.carDataProvider.saveCarData(this.carData);
          }
          else {
            console.log('else')
            this.carDataProvider.resetCarData();
            this.should_show = 1;
          }
        }
      }]
    })
    alrt.present();

  }

  changeHeight(ele) {

    if (this.value == 0) {
      this.value = 1
      console.log('if statement = ' + this.value);
    }
    else if (this.value == 1) {
      this.value = 0;
      console.log('else statement = ' + this.value);
    }
    if (this.value == 1) {
      let id = ele;
      console.log('id = ' + id);
      let item = document.getElementById(id);
      item.classList.add('expand');
      document.getElementById("down_" + ele).style.display = 'none';
      document.getElementById("up_" + ele).style.display = 'block';
    }
    if (this.value == 0) {
      let id = ele;
      console.log('id = ' + id);
      let item = document.getElementById(id);
      item.classList.remove('expand');
      item.classList.add('shrink');
      document.getElementById("up_" + ele).style.display = 'none';
      document.getElementById("down_" + ele).style.display = 'block';
    }
  }

  gotoReportRecordPage(car) {
    console.log('index == ' + this.navParms.get('carItemIndex'));
    let index = this.carData.indexOf(car);

    let modal = this.modalCtrl.create(ReportPage, {
      indexOfRecord: index
    });
    modal.present();
  }
}
