import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';


/**
 * Generated class for the EditMileagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-mileage',
  templateUrl: 'edit-mileage.html',
})
export class EditMileagePage {
  settingDataMileage:any =[];
  mileageItemsSave:any =[];

  dateTemp;
  costTemp;
  fuelTemp;
  indexOn;
  date;
  cost;
  fuel;
  index;
  currentDate: string = new Date().toISOString();

  constructor(public alertCtrl: AlertController,public settingService: SettingDataProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public mileageService: MileageDataProvider) {
    this.index = this.navParams.get('index');
    let datam = {
      currencyType: 'Dollar',
      gasUnit: 'Litre',
      distanceUnit: 'KiloMeter'
    }
    this.settingService.getdata().then((settingData) =>{
      this.settingDataMileage = JSON.parse(settingData);
      if(this.settingDataMileage == null){
        this.settingDataMileage = datam;
      }
      if(this.settingDataMileage.gasUnit == undefined){
        this.settingDataMileage.gasUnit = datam.gasUnit;
      }
      if(this.settingDataMileage.currencyType == undefined){
        this.settingDataMileage.currencyType = datam.currencyType;
      }
      console.log('setting data on mileage page + ' + this.settingDataMileage);
    });
    this.mileageService.getdata().then((finaldata) => {
      this.mileageItemsSave = JSON.parse(finaldata);
      console.log('final data on mileage detail page =  ' + this.mileageItemsSave);
     
      this.dateTemp = this.mileageItemsSave[this.index].mileageDate;
      this.costTemp = this.mileageItemsSave[this.index].mileageCost;
      this.fuelTemp = this.mileageItemsSave[this.index].mileageFuel;
      this.indexOn = this.mileageItemsSave[this.index].indexNumbermileage;
      if(this.cost == null){
        this.cost = this.costTemp
      }
      if(this.date == null){
        this.date = this.dateTemp
      }
      if(this.fuel == null){
        this.fuel = this.fuelTemp
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMileagePage');
  }
  setgasmileagesetting(){
    if(this.mileageItemsSave != null){
      let data = {
        indexNumbermileage: this.indexOn,
        mileageDate: this.date,
        mileageFuel: this.fuel,
        mileageCost: this.cost
      }
     
      this.viewCtrl.dismiss(data);
    }
  }
  savemileageitems(mileageItems){
    if(this.mileageItemsSave == null){
      this.mileageItemsSave = [];
    }
   this.mileageItemsSave[this.index] = mileageItems;
   this.mileageService.savemileageitems(this.mileageItemsSave);
  }
  delete(final){

    let index = this.index;
   
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete the selected Car Data?',
      buttons: [{
        text: 'Delete',
        handler: () =>{
         
          if(this.mileageItemsSave != null){
            // index = this.maintenanceDataItems.indexOf(final);
            // indexLength = this.maintenanceDataItems.length;
            if(index > -1){
              for(let i=0; i<this.mileageItemsSave.length;i++){
                if(i == index){
                  this.mileageItemsSave.splice(index, 1)
                  this.mileageService.savemileageitems(this.mileageItemsSave);
                }
              }
            }
          } 
          this.navCtrl.resize();
          //this.navCtrl.pop();
          this.viewCtrl.dismiss();
        }
      },
      {
        text: 'Cancel',
        handler: () => {
        //this.navCtrl.pop();
            
      }
    }]
    });
    alert.present();
       
  }

}
