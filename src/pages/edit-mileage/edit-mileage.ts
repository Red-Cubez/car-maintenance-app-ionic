import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController,ModalController } from 'ionic-angular';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { SettingsPage } from '../settings/settings';


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
  currency;

  constructor(public modalCtrl: ModalController,public alertCtrl: AlertController,public settingService: SettingDataProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public mileageService: MileageDataProvider) {
    this.index = this.navParams.get('index');
    let datam = {
      currencyType: 'USD ($)',
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
      if(this.settingDataMileage.currencyType == "USD ($)"){
        this.currency = '$';
      }
      if(this.settingDataMileage.currencyType == "GBP (₤)"){
        this.currency = '₤';
      }
      if(this.settingDataMileage.currencyType == "CAD ($)"){
        this.currency = '$'
      }
      if(this.settingDataMileage.currencyType == "PKR (Rs.)"){
        this.currency = 'Rs.'
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
        mileageCost: this.cost,
        mileageYear: this.date.slice(0,4),
        mileageMonth: this.date.slice(0,7)
      }
     
      this.viewCtrl.dismiss(data);
    }
  }
  gotoSettingPage(){
    let modal  = this.modalCtrl.create(SettingsPage);
    modal.onDidDismiss(settingData => {
      if(settingData != undefined){
        if((settingData.currencyType == undefined) && (settingData.gasUnit == undefined)){
          settingData.currencyType = this.settingDataMileage.currencyType;
          settingData.gasUnit = this.settingDataMileage.gasUnit;
          let data = {
            currencyType: settingData.currencyType,
            gasUnit: settingData.gasUnit,
            distanceUnit: settingData.distanceUnit
          }
          if(settingData.currencyType =="USD ($)"){
            this.currency = '$';
          }
          if(settingData.currencyType == "GBP (₤)"){
            this.currency = '₤';
          }
          if(settingData.currencyType == "CAD ($)"){
            this.currency = '$'
          }
          if(settingData.currencyType == "PKR (Rs.)"){
            this.currency = 'Rs.'
          }

          this.saveSetting(data);
        }
        else if(settingData.currencyType == undefined){
          let data = {
            currencyType: this.settingDataMileage.currencyType,
            gasUnit: settingData.gasUnit,
            distanceUnit: settingData.distanceUnit
          }
          if(this.settingDataMileage.currencyType == "USD ($)"){
            this.currency = '$';
          }
          if(this.settingDataMileage.currencyType == "GBP (₤)"){
            this.currency = '₤';
          }
          if(this.settingDataMileage.currencyType == "CAD ($)"){
            this.currency = '$'
          }
          if(this.settingDataMileage.currencyType == "PKR (Rs.)"){
            this.currency = 'Rs.'
          }

          this.saveSetting(data);
        }
        else if(settingData.gasUnit == undefined){
          let data = {
            currencyType: settingData.currencyType,
            gasUnit: this.settingDataMileage.gasUnit,
            distanceUnit: settingData.distanceUnit
          }
          if(settingData.currencyType =="USD ($)"){
            this.currency = '$';
          }
          if(settingData.currencyType == "GBP (₤)"){
            this.currency = '₤';
          }
          if(settingData.currencyType == "CAD ($)"){
            this.currency = '$'
          }
          if(settingData.currencyType == "PKR (Rs.)"){
            this.currency = 'Rs.'
          }

           
          this.saveSetting(data);
        }
      
        else{
          let data = {
            currencyType: settingData.currencyType,
            gasUnit: settingData.gasUnit,
            distanceUnit: settingData.distanceUnit
          }
          if(settingData.currencyType == "USA-Dollar"){
            this.currency = '$';
          }
          if(settingData.currencyType == "British-Pound"){
            this.currency = '₤';
          }
          if(settingData.currencyType == "Canadian-Dollar"){
            this.currency = 'Can-$'
          }
          if(settingData.currencyType == "Pakistani-Ruppee"){
            this.currency = 'Rs'
          }


          this.saveSetting(data);
        }
      }
      else{
        let data = {
          currencyType: this.settingDataMileage.currencyType,
          gasUnit: this.settingDataMileage.gasUnit,
          distanceUnit: this.settingDataMileage.distanceUnit
        }

        this.saveSetting(data);

      }
    });
    modal.present();
  }
  saveSetting(data){
    this.settingDataMileage = data;
    this.settingService.saveSettingData(this.settingDataMileage);
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
          let data = {
            temprary: 'toDelete'
          }
          this.viewCtrl.dismiss(data);
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
