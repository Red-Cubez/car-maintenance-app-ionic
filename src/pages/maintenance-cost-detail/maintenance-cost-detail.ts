import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { SetMaintenanceCostPage } from '../set-maintenance-cost/set-maintenance-cost';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { SettingDataProvider } from '../../providers/setting-data/setting-data';
import { FinalDataProvider } from '../../providers/final-data/final-data';  
/**
 * Generated class for the MaintenanceCostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maintenance-cost-detail',
  templateUrl: 'maintenance-cost-detail.html',
})
export class MaintenanceCostDetailPage {

 public maintenancedataitems = [];

  settingdatareq = [];
  indexonMaintenancedetail;
  public finaldataarray = [];
 abcd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public maintenanceservice: MaintenanceDataProvider, public events: Events, public finaldataservice: FinalDataProvider, public settingservice: SettingDataProvider) 
  {
    let datam: any = {
    
      currencyPrefernce: 'Dollar',
      distanceUnit: 'Km',
      gasUnit:'Litre'
    }
        this.maintenanceservice.getdata().then((finaldata) => {
         this.maintenancedataitems = JSON.parse(finaldata);
         console.log('final data on maintenance detail page =  ' + this.maintenancedataitems);
        });

        this.indexonMaintenancedetail = this.navParams.get('indexSending');
        console.log('index on maintenance = ' + this.indexonMaintenancedetail);

        this.settingservice.getdata().then((settingdata) =>{
          this.settingdatareq = JSON.parse(settingdata);
          if (this.settingdatareq == null){

            this.settingdatareq = datam;
      
            console.log("default setting value = " + this.settingdatareq)
          }
            
          
              });
              console.log('setting data on setting page - ' + this.settingdatareq);
         
  }

  ionViewDidLoad() {
       console.log('ionViewDidLoad MaintenanceCostDetailPage');
       console.log('index on maintenance = ' + this.navParams.get('indexSending'));
  }

  // jump to maintenance setting page 
  gotosetmaintenancecost(){
    
         let modal = this.modalCtrl.create(SetMaintenanceCostPage);
         modal.onDidDismiss(maintenanceitems =>{
         if(maintenanceitems != null){
             let data = {
                  indexonMaintenance: this.indexonMaintenancedetail,
                  maintenanceCost: maintenanceitems.maintenanceCost,
                  maintenanceDate: maintenanceitems.maintenanceDate,
                  maintenanceItem: maintenanceitems.maintenanceItem
                }
                this.savemaintenance(data);
               } // end if 

           else{
               console.log(' null value on maintenance detail page')
            }
        });
        modal.present();
  }


  // saving a=maintenance data to provider
  savemaintenance(maintenancedata){

    if( this.maintenancedataitems == null)
    {
      console.log("creating new array");
      this.maintenancedataitems = [];
      console.log("maintenance items - " + this.maintenancedataitems);
    }
    else{
      console.log("existing maintenance data items- " + this.maintenancedataitems);
    }
    
  this.maintenancedataitems.push(maintenancedata);
  this.maintenanceservice.savemaintenace(this.maintenancedataitems);
  }
}
