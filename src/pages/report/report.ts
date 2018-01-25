import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  public mileagedata = [];
  public maintenancedataforreport = [];
  maintenanceReportoption: any;
  mileageReportoption: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public maintenancereport: MaintenanceDataProvider)
  {
   // getting data from maintenance provider
   this.maintenancereport.getdata().then((maintenancedata) => 
   {
   this.maintenancedataforreport = JSON.parse(maintenancedata);

   console.log('this is try ' + this.maintenancedataforreport);  

   console.log('maintenance data on report - ' + maintenancedata);
  });

  

 // console.log(main)
  
  //  this.maintenanceReportoption = {

  // chart: {
  //   type: 'column'
  // },
  // title: {
  //   text: 'Car Maintenance'
  // },
  // xAxis: {
  //   categories: [this.maintenancedataforreport]
  // },
  // yAxis: {
  // min: 0,
  // title: {
  //     text: 'cost'
  // }
  // },
  // series: [{
  //   name: 'name',
  //   data: []
  // }]
  // }
  }
  
  
  ionViewDidLoad() 
  {
   console.log('ionViewDidLoad ReportPage');
  }
}
