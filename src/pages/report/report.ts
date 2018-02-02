import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { Chart } from 'chart.js';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';

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

  public mileageDataForReport = [];
  public maintenanceDataForReport = [];
  maintenanceReportOption: any;
  mileageReportOption: any;
 public maintenanceDate: any = [];
 public maintenanceCost: any = [];
 public maintenanceItem: any = [];
 public indexOnReportPage : number;
 public costParseMaintenance: number;
 public mileageDate: any = [];
 public mileageFuel: any = [];
 public fuelParseMileage: number;



  constructor(public mileageProvider: MileageDataProvider,public navCtrl: NavController, public navParams: NavParams, public maintenancereport: MaintenanceDataProvider)
  {
   // getting data from maintenance provider
   this.maintenancereport.getdata().then((maintenancedata) => 
   {
      this.maintenanceDataForReport = JSON.parse(maintenancedata);
    if(this.maintenanceDataForReport != null){
      this.maintenanceDataForReport.map((maintenancedata) =>{
        this.maintenanceDate.push(maintenancedata.maintenanceDate);
        this.maintenanceCost.push(maintenancedata.maintenanceCost);
        this.maintenanceItem.push(maintenancedata.maintenanceItem);
        console.log('maintenance Date on report = ' + this.maintenanceDate);
        console.log('maintenance Item on report = ' + this.maintenanceCost);
        this.createMaintenanceGraph();
      });
    }
      console.log('this is try ' + this.maintenanceDataForReport);  
      console.log('maintenance data on report - ' + maintenancedata);
      console.log('maintenance Cost on report 0000 - ' + this.indexOnReportPage);  
    });


    this.mileageProvider.getdata().then((mileagedata) => 
    {
      
       this.mileageDataForReport = JSON.parse(mileagedata);
       if(this.mileageDataForReport != null){
       this.mileageDataForReport.map((mileagedata) =>{
         this.mileageDate.push(mileagedata.mileageDate);
         this.mileageFuel.push(mileagedata.mileageFuel);
       
         console.log('mileage Date on report = ' + this.mileageDate);
         console.log('mileage Fuel on report = ' + this.mileageFuel);
      
         this.createMileageGraph();
       });
      }
       console.log('this is try ' + this.mileageDataForReport);  
       console.log('maintenance data on report - ' + mileagedata);
       console.log('maintenance Cost on report 0000 - ' + this.indexOnReportPage);  
     });

  }
  ionViewDidLoad() 
  {
   console.log('ionViewDidLoad ReportPage'); 
  }

createMaintenanceGraph(){

  console.log('enter to function maintenance function' + ' items - ' + this.maintenanceItem[0] + ' Cost - ' + this.maintenanceCost[0] + ' Date - ' + this.maintenanceDate[0]);
 this.costParseMaintenance = parseInt(this.maintenanceCost[0]);
  this.maintenanceReportOption = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Car Maintenance'
  },
  xAxis: {
      categories: [this.maintenanceDate[0]]
      
  },
  yAxis: {
    min: 0,
    title: {
        text: 'cost'
    }
  },
  series: [{
      name: this.maintenanceItem[0],
      data: [this.costParseMaintenance]
  }]
  }


}

createMileageGraph(){

  console.log('enter to function mileage function' + ' Date - ' + this.mileageDate[0] + ' Fuel - ' + this.mileageFuel[0]);
  this.fuelParseMileage = parseInt(this.mileageFuel[0]);
   this.mileageReportOption = {
     chart: {
       type: 'column'
   },
   title: {
       text: 'Car Maintenance'
   },
   xAxis: {
       categories: [this.mileageDate[0]]
       
   },
   yAxis: {
     min: 0,
     title: {
         text: 'cost'
     }
   },
   series: [{
       name: "Fuel",
       data: [this.costParseMaintenance]
   }]
   }

}
  
  
 

}
