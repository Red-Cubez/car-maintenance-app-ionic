import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the SetGasMileagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-gas-mileage',
  templateUrl: 'set-gas-mileage.html',
})
export class SetGasMileagePage {


  mileageDate:any;
  mileageFuel: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController)
  {
  }

  ionViewDidLoad()
  {
   console.log('ionViewDidLoad SetGasMileagePage');
  }


  // setting gas mileage data to array
  setgasmileagesetting()
  {
  if((this.mileageDate == null) || (this.mileageDate == "") || (this.mileageDate == " " ) )
  {
    // di nothing if gasmileage date is empty
  } // end if
  else
  {
   let mileageitems = 
   {
    mileageDate: this.mileageDate,
    mileageFuel: this.mileageFuel
   };
   this.viewCtrl.dismiss(mileageitems);
  } // end else
  }
}
