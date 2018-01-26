import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,  } from 'ionic-angular';
import { GasMileageDetailPage } from '../gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../maintenance-cost-detail/maintenance-cost-detail';
import { CarDataProvider } from '../../providers/car-data/car-data';
import { ReportPage } from '../report/report';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { FinalDataProvider } from '../../providers/final-data/final-data';
/**
 * Generated class for the CarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage {
caritemsdetail = [];
mileagedataarray = [];
maintenancedataarray = [];
 public finaldataarray = [];

public carItem;
index;


  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public cardetailservice: CarDataProvider, public mileageprovider: MileageDataProvider,  public maintenanceprovider: MaintenanceDataProvider, public finalproviders: FinalDataProvider) 
  {
    this.mileageprovider.getdata().then((mileagedata) =>
    {
    // getting cardata from provider
      this.mileagedataarray = JSON.parse(mileagedata);
      console.log('mileage data on detail page - ' + this.mileagedataarray);
     
    });


    this.maintenanceprovider.getdata().then((maintenancedata) =>
    {
    // getting cardata from provider
      this.maintenancedataarray = JSON.parse(maintenancedata);
      console.log('maintenance data on detail page - ' + this.maintenancedataarray);
    });
    
    
    this.carItem = this.navParams.get('CarItem');
    // this.personAge = this.navParams.get('PersonItem').personAge;
    // this.PrescriptionItems = this.navParams.get('PersonItem').PrescriptionItems;
    // this.MedicenItems = this.navParams.get('PersonItem').MedicenItems;
   
    // this.notificationDetails = this.navParams.get('notificationDetails');
    this.index = this.navParams.get('index');

    if(this.carItem == null)
    {
      console.log("received null car item on details page");
    }else{
      console.log("received car item on details page - " + this.carItem);


    }

    console.log("current car item : " + this.carItem.carMake);

  }

  // ionViewWillEnter() {

  //   this.carItem = this.navParams.get('CarItem');
  //   // this.personAge = this.navParams.get('PersonItem').personAge;
  //   // this.PrescriptionItems = this.navParams.get('PersonItem').PrescriptionItems;
  //   // this.MedicenItems = this.navParams.get('PersonItem').MedicenItems;
   
  //   // this.notificationDetails = this.navParams.get('notificationDetails');
  //   this.index = this.navParams.get('index');

  //   if(this.carItem == null)
  //   {
  //     console.log("received null car item on details page");
  //   }else{
  //     console.log("received car item on details page - " + this.carItem);
  //   }

  //   console.log("current car item : " + this.carItem.carMake);
  // }




  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CarDetailPage');

    let finaldata = {

      carname: this.carItem.carMake,
      maintenancedata: this.maintenancedataarray,
      mileagedata: this.mileagedataarray
    }
    console.log('abcdeffg - ' + finaldata.maintenancedata);
    this.savefinaldata(finaldata);

  }

  // go to mileage detail page
  gotogasmileagedetail()
  {
   this.navCtrl.push(GasMileageDetailPage);
  }

  // go to maintenance detail page  
  gotomaintenancecostdetailpage()
  {
   this.navCtrl.push(MaintenanceCostDetailPage);
  }

  // go to report page
  gotoreportpage()
  {
   this.navCtrl.push(ReportPage);
  }

  savefinaldata(finaldata){
       this.finaldataarray.push(finaldata);
       this.finalproviders.save(this.finaldataarray);

  }
}
