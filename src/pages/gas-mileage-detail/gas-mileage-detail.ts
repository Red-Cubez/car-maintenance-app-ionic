import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SetGasMileagePage } from '../set-gas-mileage/set-gas-mileage';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { EditMileagePage } from '../edit-mileage/edit-mileage';
import { RelationDataProvider } from '../../providers/relation-data/relation-data';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the GasMileageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gas-mileage-detail',
  templateUrl: 'gas-mileage-detail.html',
})
export class GasMileageDetailPage {

  mileageItemsSave = [];
  public indexonMileage;
  public settingDataMileage: any = [];
  relationArray:any = [];
  relationNumber;
  currency;
  constructor(public relationService: RelationDataProvider,public settingService: SettingDataProvider,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public mileageService: MileageDataProvider) {
    this.indexonMileage = this.navParams.get('indexSended');
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
    });
    this.relationService.getdata().then((relationData)=>{
      this.relationArray = JSON.parse(relationData);
      console.log('relationData on mileage detail page =  ' + this.mileageItemsSave);
      if(this.relationArray != null){
        for(let i=0;i<this.relationArray.length;i++){
          if(this.relationArray[i].carIndex == this.indexonMileage){
            this.relationNumber = this.relationArray[i].relationNumber;
          }
        }
        console.log('relation number on mileage detail page =  ' + this.relationNumber);
      }
    });
    
    console.log('index on mileage page - ' + this.indexonMileage);
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad GasMileageDetailPage');
  }

  editMileage(mile){
    let index = this.mileageItemsSave.indexOf(mile);
    let modal = this.modalCtrl.create(EditMileagePage,{
      index
    });
    modal.onDidDismiss(dataOn => {
      if(dataOn == undefined){
      }
      else{
        if(dataOn != undefined){
          if(dataOn.temprary == 'toDelete'){
            console.log("data is undefined")
        
            let data = {
              indexNumbermileage: 0,
              mileageDate: 0,
              mileageFuel: 0,
              mileageCost: 0
            }
  
            this.mileageItemsSave[index] = dataOn;
            this.mileageItemsSave.splice(index,1)
            this.mileageService.savemileageitems(this.mileageItemsSave);
            this.navCtrl.resize();
          }
          else{
            let data = {
              indexNumbermileage: dataOn.indexNumbermileage,
              mileageDate: dataOn.mileageDate,
              mileageFuel: dataOn.mileageFuel,
              mileageCost: dataOn.mileageCost,
              mileageYear: dataOn.mileageYear
            }
            this.mileageItemsSave[index] = dataOn;
            this.mileageService.savemileageitems(this.mileageItemsSave);
          }
        }
      }
    });
    modal.present();
  }

  // go  to mileage setting page
  gotosetgasmileage(){
    let modal = this.modalCtrl.create(SetGasMileagePage);
    modal.onDidDismiss(mileageitems =>{
     if(mileageitems != null){
        let data = {
          indexNumbermileage: this.relationNumber,
          mileageDate: mileageitems.mileageDate,
          mileageFuel: mileageitems.mileageFuel,
          mileageCost: mileageitems.mileageCost,
          mileageYear: mileageitems.mileageYear
        }
        this.savemileageitems(data);
      } // end if
    });
    modal.present();
  }


  // setting maileage data to milage provider
  savemileageitems(mileageItems){
    if(this.mileageItemsSave == null){
      this.mileageItemsSave = [];
    }
   this.mileageItemsSave.push(mileageItems);
   this.mileageService.savemileageitems(this.mileageItemsSave);
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
}
