import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
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
public settingdataarr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public setteingservice: SettingDataProvider)
  {
    this.setteingservice.getdata().then((settingdata) =>{
      this.settingdataarr = JSON.parse(settingdata);
      
          });
          console.log('setting data on setting page - ' + this.settingdataarr);
  
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
