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
 public maintenanceDate: any = [];
 public maintenanceCost: any = [];
 public maintenanceItem: any = [];
 public indexonReportpage: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public maintenancereport: MaintenanceDataProvider)
  {


   // getting data from maintenance provider
   this.maintenancereport.getdata().then((maintenancedata) => 
   {
   this.maintenancedataforreport = JSON.parse(maintenancedata);

   this.maintenancedataforreport.map((maintenancedata) =>{
    this.maintenanceDate.push(maintenancedata.maintenanceDate);
    console.log('maintenance Date on report = ' + this.maintenanceDate[0]);
});

this.maintenancedataforreport.map((maintenancedata) =>{
  this.maintenanceCost.push(maintenancedata.maintenanceCost);
  console.log('maintenance Cost on report = ' + this.maintenanceCost[0]);
    this.indexonReportpage = this.maintenanceCost[0];


});
   console.log('this is try ' + this.maintenancedataforreport);  

   console.log('maintenance data on report - ' + maintenancedata);
  });

  console.log('maintenance Cost on report 0000 - ' + this.indexonReportpage);
  
   this.maintenanceReportoption = {

  chart: {
    type: 'column'
  },
  title: {
    text: 'Car Maintenance'
  },
  xAxis: {
   
    categories:  ['this.maintenancedataforreport[0]']
    
  },
  yAxis: {
  min: 0,
  title: {
      text: 'cost'
  }
  },
  series: [{
    name: 'name',
    data: [this.indexonReportpage]
  }]
  }
  }
  
  
  ionViewDidLoad() 
  {
   console.log('ionViewDidLoad ReportPage');
 
  }
}
