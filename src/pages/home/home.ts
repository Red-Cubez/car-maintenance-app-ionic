import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, Events } from 'ionic-angular';
import { AddItemPage} from '../add-item/add-item';
import { SettingsPage } from '../settings/settings';
import { CarDetailPage } from '../car-detail/car-detail';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';
import { CarDataProvider } from '../../providers/car-data/car-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Caritems = [];
  car;

// caritems = []
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParms: NavParams, public events: Events, public dataservice: CarDataProvider) {

    this.dataservice.getdata().then((cardata) =>{
    this.Caritems = JSON.parse(cardata);
});


  }

  ionViewDidLoad() {
    if(this.Caritems == null)
    {
      
    }
// //     this.events.subscribe('adding:items', (items)=>{

// // console.log(items);
//     });
  
  }
  
  gotosettings(){

    this.navCtrl.push(SettingsPage);
  }
  gotoadditempage(){

    let modal = this.modalCtrl.create(AddItemPage);

    modal.onDidDismiss((carItem) => {

          if(carItem != null)
          {
            this.save(carItem)
            console.log("when items not null - received : " + carItem.carMake);
          }
          else{
            console.log("when items null - received : " + carItem.carMake);
          }
    //this.car = items.carMake;

          
      });
    modal.present();
  }
  gotocardetailpage(){

    this.navCtrl.push(CarDetailPage);
  }
  save(carItem){

    console.log("inserting into array - received : " + carItem.carMake);
    this.Caritems.push(carItem);
    console.log("pushed into array - received : " + carItem.carMake);
    this.dataservice.save(this.Caritems);
  }

}
