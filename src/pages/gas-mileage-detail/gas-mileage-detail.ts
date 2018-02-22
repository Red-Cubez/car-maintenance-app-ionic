import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SetGasMileagePage } from '../set-gas-mileage/set-gas-mileage';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { EditMileagePage } from '../edit-mileage/edit-mileage';
import { RelationDataProvider } from '../../providers/relation-data/relation-data';

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
  constructor(public relationService: RelationDataProvider,public settingService: SettingDataProvider,public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public mileageService: MileageDataProvider) {
    this.indexonMileage = this.navParams.get('indexSended');
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
      if(this.mileageItemsSave != null){
        let data = {
          indexNumbermileage: dataOn.indexNumbermileage,
          mileageDate: dataOn.mileageDate,
          mileageFuel: dataOn.mileageFuel,
          mileageCost: dataOn.mileageCost
        }

        this.mileageItemsSave[index] = dataOn;
        this.mileageService.savemileageitems(this.mileageItemsSave);
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
          mileageCost: mileageitems.mileageCost
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
}
