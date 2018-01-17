import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {


  carname: string;
  itemname: string;
  itemdetail: string;
  itemdateofchange: any;
  itemcurrentmileage: any;
  itemcost: any;
  itemmileagetochange: any;
  itemdatetochange: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public vewiCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  gotohomepage()
{

  this.navCtrl.pop();
}

saveitems(){

  let items ={
    carname: this.carname,
    Itemname: this.itemname,
    Itemdetail: this.itemdetail,
    Itemdateofchange: this.itemdateofchange,
    Itemcurrentmileage: this.itemcurrentmileage,
    Itemcost: this.itemcost,
    Itemmileagetochange: this.itemmileagetochange,
    Itemdatetochange: this.itemdatetochange
  };

console.log("car name: " + this.carname  );  
 // this.events.publish('adding:items', items);
this.vewiCtrl.dismiss(items);


 
}

}
