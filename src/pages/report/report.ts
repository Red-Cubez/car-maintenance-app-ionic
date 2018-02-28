import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MaintenanceDataProvider } from '../../providers/maintenance-data/maintenance-data';
import { Chart } from 'chart.js';
import { MileageDataProvider } from '../../providers/mileage-data/mileage-data';
import { RelationDataProvider } from '../../providers/relation-data/relation-data';


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

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  barChartMaintenance: any;
  barChartMileage: any;
  lineChart: any;


  public maintenanceIindexOnReportPage : number;
  public mileageIindexOnReportPage : number;
  public mileageDate: any = [];
  public mileageFuel: number[] = [];
  public mileageCost: number[] = [];
  public mileageDataForReport: any=[];
  public maintenanceDataForReport: any=[];
  public finalMaintenanceData: any=[];
  public monthlyDate: any=[];
  public monthlyCost: number[]=[];
  public monthlyItem: any=[];
  public yearlyDate: any=[];
  public yearlyCost: number[]=[];
  public yearlyItem: any=[];
  dateOfFirst;
  dateOfYear;
  monthlyMaintenanceSum: number = 0;
  monthlyMaintenanceItem: string = "";
  monthlyMaintenanceDate;
  YearMaintenanceSum: number = 0;
  yearMaintenanceItem: string = "";
  yearMaintenanceDate;
  mileageReportOption: any;
  public carNameOnReport: any;
  tempDate: any =[];
  relationArray: any =[];
  relationNumber;
  sumOfMileageFuel = 0;
  SumOfMileageCost = 0;
  sumOfMileageDate;
  finalMileageData: any =[];
  firstMileDate;
  yearMileageDate: any = [];
  yearMileageCost: number[] = [];
  yearMileageFuel: number[] = [];
  tempOne;
  tempTwo;
  
 
  constructor(public relationService: RelationDataProvider,public mileageProvider: MileageDataProvider,public navCtrl: NavController, public navParams: NavParams, public maintenanceReport: MaintenanceDataProvider){
   // getting data from maintenance provider
    this.carNameOnReport = this.navParams.get('carName');
    console.log('car Name on report = ' + this.carNameOnReport);
    this.maintenanceIindexOnReportPage = this.navParams.get('indexSending');
    this.relationService.getdata().then((relationdData) =>{
      this.relationArray = JSON.parse(relationdData);
      if(this.relationArray != null){
        for(let i=0;i<this.relationArray.length;i++){
          if(this.relationArray[i].carIndex == this.maintenanceIindexOnReportPage){
            this.relationNumber = this.relationArray[i].relationNumber;
          }
        }
      }
    });
   
    this.maintenanceReport.getdata().then((maintenanceData)=>{
      this.maintenanceDataForReport = JSON.parse(maintenanceData);
      console.log("maintenance data for report = " + this.maintenanceDataForReport)
      if(this.maintenanceDataForReport != null){
        for(let i = 0;i<this.maintenanceDataForReport.length;i++){
          if(this.maintenanceDataForReport[i].indexonMaintenance == this.relationNumber){
            this.finalMaintenanceData.push(this.maintenanceDataForReport[i])
          }
          // console.log("final data for report = " + this.maintenanceDataForReport[0].maintenanceCost);
          // console.log("final data for report = " + this.finalMaintenanceData[0].maintenanceCost);
        }
      }
      if(this.finalMaintenanceData != null){
       for(let i=0;i<this.finalMaintenanceData.length-1;i++){
         for(let j=(i+1);j<this.finalMaintenanceData.length;j++){
           if(this.finalMaintenanceData[i].maintenanceDate>this.finalMaintenanceData[j].maintenanceDate){
             this.tempDate[0] = this.finalMaintenanceData[i]
             this.finalMaintenanceData[i] = this.finalMaintenanceData[j];
             this.finalMaintenanceData[j] = this.tempDate[0];
           }
         }
        }
        this.dateOfFirst = this.finalMaintenanceData[0].maintenanceDate;
        for(let i=0;i<this.finalMaintenanceData.length;i++){
          if(this.finalMaintenanceData[i].maintenanceDate == this.dateOfFirst){
            this.monthlyMaintenanceSum += parseInt(this.finalMaintenanceData[i].maintenanceCost);
            this.monthlyMaintenanceItem += this.finalMaintenanceData[i].maintenanceItem + ' , ';
            this.monthlyMaintenanceDate = this.finalMaintenanceData[i].maintenanceDate;
          }
          else{
            this.monthlyCost.push(this.monthlyMaintenanceSum);
            this.monthlyItem.push(this.monthlyMaintenanceItem);
            this.monthlyDate.push(this.monthlyMaintenanceDate);
            this.monthlyMaintenanceSum = 0;
            this.monthlyMaintenanceItem = "";
            this.dateOfFirst = this.finalMaintenanceData[i].maintenanceDate;
            this.monthlyMaintenanceSum += parseInt(this.finalMaintenanceData[i].maintenanceCost);
            this.monthlyMaintenanceItem += this.finalMaintenanceData[i].maintenanceItem + ' , ';
            this.monthlyMaintenanceDate = this.finalMaintenanceData[i].maintenanceDate;
          }
        }
        this.monthlyCost.push(this.monthlyMaintenanceSum);
        this.monthlyItem.push(this.monthlyMaintenanceItem);
        this.monthlyDate.push(this.monthlyMaintenanceDate);
        console.log("abcdedffg = " + this.monthlyCost[0] + this.monthlyDate[0],this.monthlyItem[0]);

        this.dateOfYear = this.finalMaintenanceData[0].maintenanceYear;
        for(let i=0;i<this.finalMaintenanceData.length;i++){
          if(this.finalMaintenanceData[i].maintenanceYear == this.dateOfYear){
            this.YearMaintenanceSum += parseInt(this.finalMaintenanceData[i].maintenanceCost);
            this.yearMaintenanceItem += this.finalMaintenanceData[i].maintenanceItem + ' , ';
            this.yearMaintenanceDate = this.finalMaintenanceData[i].maintenanceYear;
          }
          else{
            this.yearlyCost.push(this.YearMaintenanceSum);
            this.yearlyItem.push(this.yearMaintenanceItem);
            this.yearlyDate.push(this.yearMaintenanceDate);
            this.YearMaintenanceSum = 0;
            this.yearMaintenanceItem = null;
            this.dateOfYear = this.finalMaintenanceData[i].maintenanceYear;
            this.YearMaintenanceSum += parseInt(this.finalMaintenanceData[i].maintenanceCost);
            this.yearMaintenanceItem += this.finalMaintenanceData[i].maintenanceItem + ' , ';
            this.yearMaintenanceDate = this.finalMaintenanceData[i].maintenanceYear;
          }
        
        }
        this.yearlyCost.push(this.YearMaintenanceSum);
        this.yearlyItem.push(this.yearMaintenanceItem);
        this.yearlyDate.push(this.yearMaintenanceDate);
        console.log("abcdedffg = " + this.yearlyCost[0] + this.yearlyDate[0],this.yearlyItem[0])
        this.createMaintenanceGraph();
        //this.createYearlyGraph();   
      }
    });
    this.mileageProvider.getdata().then((mileagedata) => {
      this.mileageDataForReport = JSON.parse(mileagedata);
      if(this.mileageDataForReport != null){

        for(let i=0;i<this.mileageDataForReport.length;i++){
          if(this.mileageDataForReport[i].indexNumbermileage == this.relationNumber){
            this.finalMileageData.push(this.mileageDataForReport[i]);
          }
        }
        if(this.finalMileageData != null){
          for(let i=0;i<this.finalMileageData.length-1;i++){
            for(let j=(i+1);j<this.finalMileageData.length;j++){
              if(this.finalMileageData[i].mileageDate>this.finalMileageData[j].mileageDate){
                this.tempDate[0] = this.finalMileageData[i]
                this.finalMileageData[i] = this.finalMileageData[j];
                this.finalMileageData[j] = this.tempDate[0];
              }
            }
           }
           this.firstMileDate =  this.finalMileageData[0].mileageDate;
          for(let i = 0; i< this.finalMileageData.length; i++){
            if(this.finalMileageData[i].mileageDate == this.firstMileDate){
              this.sumOfMileageFuel += parseInt(this.finalMileageData[i].mileageFuel);
              this.SumOfMileageCost += parseInt(this.finalMileageData[i].mileageCost);
              this.sumOfMileageDate = this.finalMileageData[i].mileageDate;
              
            }
            else{
              this.mileageDate.push(this.sumOfMileageDate);
              this.mileageFuel.push(this.sumOfMileageFuel);
              this.mileageCost.push(this.SumOfMileageCost);
              this.sumOfMileageFuel = 0;
              this.SumOfMileageCost = 0;
              this.firstMileDate = this.finalMileageData[i].mileageDate;
              this.sumOfMileageFuel += parseInt(this.finalMileageData[i].mileageFuel);
              this.SumOfMileageCost += parseInt(this.finalMileageData[i].mileageCost);
              this.sumOfMileageDate = this.finalMileageData[i].mileageDate;
              
            }
          }
          this.mileageDate.push(this.sumOfMileageDate);
          this.mileageFuel.push(this.sumOfMileageFuel);
          this.mileageCost.push(this.SumOfMileageCost);
          console.log('mileage Date on report = ' + this.mileageDate);
          console.log('mileage Fuel on report = ' + this.mileageFuel);
          console.log('this is try ' + this.mileageDataForReport);  
          console.log('mileage data on report - ' + mileagedata);
          console.log('mileage Cost on report 0000 - ' + this.mileageIindexOnReportPage);  
          this.createMileageGraph();
          this.sumOfMileageDate = "";
          this.sumOfMileageFuel = 0;
          this.SumOfMileageCost = 0;

          this.dateOfYear = this.finalMileageData[0].mileageYear;
          for(let i = 0;i<this.finalMileageData.length;i++){
            if(this.finalMileageData[i].mileageYear == this.dateOfYear){
              this.sumOfMileageFuel += parseInt(this.finalMileageData[i].mileageFuel);
              this.SumOfMileageCost += parseInt(this.finalMileageData[i].mileageCost);
              this.sumOfMileageDate = this.finalMileageData[i].mileageYear;
            }
            else{
              this.yearMileageCost.push(this.SumOfMileageCost);
              this.yearMileageFuel.push(this.sumOfMileageFuel);
              this.yearMileageDate.push(this.sumOfMileageDate);
              this.sumOfMileageFuel =0;
              this.SumOfMileageCost =0;
              this.sumOfMileageDate ="";
              this.dateOfYear = this.finalMileageData[i].mileageYear;
              this.sumOfMileageFuel += parseInt(this.finalMileageData[i].mileageFuel);
              this.SumOfMileageCost += parseInt(this.finalMileageData[i].mileageCost);
              this.sumOfMileageDate = this.finalMileageData[i].mileageYear;
            

            }

          }
          this.yearMileageCost.push(this.SumOfMileageCost);
          this.yearMileageFuel.push(this.sumOfMileageFuel);
          this.yearMileageDate.push(this.sumOfMileageDate);
          this.SumOfMileageCost = 0;
          this.sumOfMileageFuel = 0;
          this.sumOfMileageDate = "";
          this.yearlyItem = "";

          for(let i=0; i<this.yearMileageFuel.length;i++){
            this.yearlyCost.push(this.yearMileageCost[i]);
            this.yearlyDate.push(this.yearMileageDate[i]);
          }

          this.yearMileageCost = [0];
          this.yearMileageDate = ['0'];
          this.dateOfYear = this.yearlyDate[0];
          for(let i = 0;i<this.yearlyDate.length;i++){
            if(this.yearlyDate[i] == this.dateOfYear){
              this.sumOfMileageFuel += this.yearlyCost[i];
              this.sumOfMileageDate = this.yearlyDate[i];
            }
            else{
              this.yearMileageCost.push(this.sumOfMileageFuel);
              this.yearMileageDate.push(this.sumOfMileageDate);
              this.sumOfMileageFuel = 0;
              this.sumOfMileageDate = 0;
              this.dateOfYear = this.yearlyDate[i];
              this.sumOfMileageFuel += this.yearlyCost[i];
              this.sumOfMileageDate = this.yearlyDate[i];
            }
          }
          this.yearMileageCost.push(this.sumOfMileageFuel);
          this.yearMileageDate.push(this.sumOfMileageDate);
          console.log("mileage cost" + this.yearMileageCost);
          console.log("mileage Date" + this.yearMileageDate)
          this.createYearlyGraph();
        }
      }
   
    });
    

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage'); 
  }

  createMaintenanceGraph(){
    console.log('enter to maintenance function' + ' items - ' + this.monthlyItem[0] + ' Cost - ' + this.monthlyCost[0] + ' Date - ' + this.monthlyDate[0]);
    this.barChartMaintenance = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: this.monthlyDate,
          datasets: [{
              label: "Cost",
              data: this.monthlyCost,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
          }
      }

    });
  }

  createMileageGraph(){
    console.log('enter to mileage function' + ' Date - ' + this.mileageDate[0] + ' Fuel - ' + this.mileageFuel[0],' Cost - ' + this.mileageCost[0]);
    this.barChartMileage = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'bar',
      data: {
          labels: this.mileageDate,
          datasets: [{
              label: "Cost",
              data: this.mileageCost,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
          }
      }
    });
  }
  createYearlyGraph(){
    console.log('enter to yearly graph function' + ' Date - ' + this.yearlyDate[0] + ' cost - ' + this.yearlyCost[0],' items - ' + this.yearlyItem[0]);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
          labels: this.yearMileageDate,
          datasets: [
              {
                  label: "Cost",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.yearMileageCost,
                  spanGaps: false,
              }
          ]
      }

    });
  }
}
