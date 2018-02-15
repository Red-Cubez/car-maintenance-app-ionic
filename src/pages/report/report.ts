import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { Chart } from 'chart.js';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { FinalDataProvider } from '../../providers/final-data/final-data';  
import { YearMaintenanceProvider } from '../../providers/year-maintenance/year-maintenance';

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
  public maintenanceDate: any = [];
  public maintenanceCost: number[] = [];
  public maintenanceItem: any = [];
  public yearDate: any = [];
  public yearCost: number[] = [];
  public yearItem: any = [];
  public maintenanceIindexOnReportPage : number;
  public mileageIindexOnReportPage : number;
  public mileageDate: any = [];
  public mileageFuel: number[] = [];
  public mileageCost: number[] = [];
  maintenanceReportOption: any;
  mileageReportOption: any;
  public carNameOnReport: any;
  yearlyDataForReport: any = [];
  yearlyReportOption: any = [];


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend:boolean = true;
 
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(public finalDataService: FinalDataProvider,public yearFinalService: YearMaintenanceProvider,public mileageProvider: MileageDataProvider,public navCtrl: NavController, public navParams: NavParams, public maintenanceReport: MaintenanceDataProvider){
   // getting data from maintenance provider
   this.carNameOnReport = this.navParams.get('carName');
   console.log('car Name on report = ' + this.carNameOnReport);
   this.finalDataService.getdata().then((finalData) => {
      this.maintenanceDataForReport = JSON.parse(finalData);
      console.log('maintenance array = ' + this.maintenanceDataForReport);
      console.log('maintenance data = ' + finalData)
      if(this.maintenanceDataForReport != null){
        this.maintenanceDataForReport = this.maintenanceDataForReport[0].dataMaintenanceOn;
        console.log('enter to the maintenance Condition ');
        this.maintenanceIindexOnReportPage = this.navParams.get('indexSending');
        for(let i = 0; i<this.maintenanceDataForReport.length; i++){
          console.log('enter to the maintenance loop start')
          if(this.maintenanceDataForReport[i].currentIndex == this.maintenanceIindexOnReportPage){
            console.log('enter to the maintenance loop middle')
            this.maintenanceDate.push(this.maintenanceDataForReport[i].currentDate);
            this.maintenanceCost.push(parseInt(this.maintenanceDataForReport[i].sum));
            this.maintenanceItem.push(this.maintenanceDataForReport[i].items);
            
          }
          console.log('enter to the maintenance loop end')
        }
        this.createMaintenanceGraph();
        
      }
      console.log('maintenance Date on report 123456 = ' + this.maintenanceDate);
      console.log('maintenance Item on report 123456 = ' + this.maintenanceItem);
      console.log('maintenance Cost on report 0000 - ' + this.maintenanceIindexOnReportPage);  
    });
    this.yearFinalService.getdata().then((yearFinalData) => {
      this.yearlyDataForReport = JSON.parse(yearFinalData);
      console.log('year array = ' + this.yearlyDataForReport);
      console.log('year data = ' + yearFinalData)
      if(this.yearlyDataForReport != null){
        this.yearlyDataForReport = this.yearlyDataForReport[0].dataYearOn;
        console.log('enter to the yearly Condition - ');
        this.maintenanceIindexOnReportPage = this.navParams.get('indexSending');
        for(let i = 0; i<this.yearlyDataForReport.length; i++){
          console.log('enter to the year loop start')
          if(this.yearlyDataForReport[i].indexYearly == this.maintenanceIindexOnReportPage){
            console.log('enter to the year loop middle')
            this.yearDate.push(this.yearlyDataForReport[i].dateYearly);
            this.yearCost.push(parseInt(this.yearlyDataForReport[i].sumOfYear));
            this.yearItem.push(this.yearlyDataForReport[i].itemsYearly);
            console.log('year Date on report = ' + this.yearDate);
            console.log('year Cost on report = ' + this.yearCost);
            
          }
          console.log('enter to the year loop end')
        }
        this.createYearlyGraph();
      }
      console.log('this is try ' + this.maintenanceDataForReport);  
      console.log('maintenance data on report - ' + yearFinalData);
      console.log('maintenance Cost on report 0000 - ' + this.maintenanceIindexOnReportPage);  
    });
    
    this.mileageProvider.getdata().then((mileagedata) => {
      this.mileageDataForReport = JSON.parse(mileagedata);
      if(this.mileageDataForReport != null){
        this.mileageIindexOnReportPage = this.navParams.get('indexSending');
        for(let i = 0; i< this.mileageDataForReport.length; i++){
          if(this.mileageDataForReport[i].indexNumbermileage == this.mileageIindexOnReportPage){
            this.mileageDate.push(this.mileageDataForReport[i].mileageDate);
            this.mileageFuel.push(parseInt(this.mileageDataForReport[i].mileageFuel));
            this.mileageCost.push(parseInt(this.mileageDataForReport[i].mileageCost));
            
            
          }
        }
        this.createMileageGraph();
        console.log('mileage Date on report = ' + this.mileageDate);
        console.log('mileage Fuel on report = ' + this.mileageFuel);
      }
      console.log('this is try ' + this.mileageDataForReport);  
      console.log('mileage data on report - ' + mileagedata);
      console.log('mileage Cost on report 0000 - ' + this.mileageIindexOnReportPage);  
    });
    

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage'); 
  }

  createMaintenanceGraph(){
    console.log('enter to maintenance function' + ' items - ' + this.maintenanceItem + ' Cost - ' + this.maintenanceCost + ' Date - ' + this.maintenanceDate);
    this.maintenanceReportOption = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Car Maintenance'
      },
      xAxis: {
        categories: [this.maintenanceDate[0],this.maintenanceDate[1]]
      },
      yAxis: {
        min: 0,
        title: {
          text: 'cost'
        }
      },
      series: [{
        name: this.maintenanceItem[0],
        data: [this.maintenanceCost[0]]
      },{
        name: this.maintenanceItem[1],
        data: [this.maintenanceCost[1]]
      }]
    }
  }

  createMileageGraph(){
    console.log('enter to mileage function' + ' Date - ' + this.mileageDate[0] + ' Fuel - ' + this.mileageFuel[0],' Cost - ' + this.mileageCost[0]);
    this.mileageReportOption = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Car Mileage'
      },
      xAxis: {
        categories: [this.mileageDate[0]]
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Litre / Gallon'
        }
      },
      series: [{
        name: 'fuel',
        data: [this.mileageFuel[0]]
      }]
    }
  }
  createYearlyGraph(){
    console.log('enter to yearly graph function' + ' Date - ' + this.yearDate[0] + ' cost - ' + this.yearCost[0],' items - ' + this.yearItem[0]);
    this.yearlyReportOption = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Year report'
      },
      xAxis: {
        categories: [this.yearDate[0],this.yearDate[1]]
      },
      yAxis: {
        min: 0,
        title: {
          text: 'cost'
        }
      },
      series: [{
        name: this.yearItem[0],
        data: [this.yearCost[0]]
        },{
        name: this.yearItem[1],
        data: [this.yearCost[1]]
      }]
      
    }
  }
}
