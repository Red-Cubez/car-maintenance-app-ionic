import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CarDataProvider } from '../../providers/car-data/car-data';

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
  mileageData = [];
  mileageDataOriginal = [];
  maintenanceData = [];
  maintenanceDataOriginal = [];
  mileageCost = [];
  mileageDate = [];
  maintenanceCost = [];
  maintenanceDate = [];
  yearCost = [0];
  yearDate = [''];
  years = [];
  indexNumber;
  name;
  year;
  model;
  r;
  g;
  b;
  loop_counter;
  mileage_loop_counter;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public cardDataProvider: CarDataProvider, ) {

  }
  ionViewDidLoad() {
    this.indexNumber = this.navParams.get('indexOfRecord');
    this.cardDataProvider.getCardata().then(res => {
      this.mileageDataOriginal = res[this.indexNumber].carMileageDetail;
      this.maintenanceDataOriginal = res[this.indexNumber].carMaintenanceDetail;
      this.name = res[this.indexNumber].carMake;
      this.model = res[this.indexNumber].carModel;
      this.year = res[this.indexNumber].carYear;


      this.maintenanceDataSetting();
      this.mileageDataSetting();
      this.yearDataSetting();

      this.createMileageGraph();
      this.createMaintenanceGraph();
      this.createYearlyGraph();
    })
    console.log('ionViewDidLoad ReportPage');

  }

  getColor(loop_counter)
  {
    let colorList= [];
    for(let i = 0; i<loop_counter;i++)
    {
      this.r = Math.floor(Math.random()*256);         
      this.g = Math.floor(Math.random()*256);          
      this.b = Math.floor(Math.random()*256); 

       colorList.push('rgba(' + this.r + ',' + this.g + ',' + this.b + ','+'0.5)');
    }

    console.log('Colour == ' + 'rgba(' + this.r + ',' + this.g + ',' + this.b + ','+'0.2)');
    return colorList;
  }
  
  dismissing() {
    this.viewCtrl.dismiss();
  }
  createMaintenanceGraph() {
    console.log("date == " + this.maintenanceDate);
    let colorList = this.getColor(this.loop_counter);
    

    this.barChartMaintenance = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.maintenanceDate,
        datasets: [{
          label: "Cost",
          data: this.maintenanceCost,
          backgroundColor: colorList,
          borderColor:colorList,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            title: 'Cost'
          }]
        }
      }
    });
  }

  createMileageGraph() {

    let colorList = this.getColor(this.mileage_loop_counter);

    this.barChartMileage = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.mileageDate,
        datasets: [{
          label: "Consumption",
          data: this.mileageCost,
          backgroundColor: colorList,
          borderColor: colorList,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            title: 'Consumption'
          }]
        }
      }
    });

  }
  createYearlyGraph() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: this.yearDate,
        datasets: [
          {
            label: "Cost",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(0, 111, 179, 0.4)",
            borderColor: "rgba(0, 111, 179, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(0, 111, 179, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(0, 111, 179, 1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.yearCost,
            spanGaps: false,
          }
        ]
      }

    });
  }
  maintenanceDataSetting() {
    this.loop_counter = 0;
    if (this.maintenanceDataOriginal.length > 0) {
      this.maintenanceDataOriginal.forEach(element => {
        let date = element.maintenanceDateString;
        console.log('date = ' + date)
        let spliteDate = date.split('-')
        this.maintenanceData.push({ cost: element.maintenanceCost, date: spliteDate[2] })
        this.loop_counter++;
      });
      for (let i = 0; i < this.maintenanceData.length - 1; i++) {
        for (let j = (i + 1); j < this.maintenanceData.length; j++) {
          if (this.maintenanceData[i].date > this.maintenanceData[j].date) {
            let tempDate = this.maintenanceData[i]
            this.maintenanceData[i] = this.maintenanceData[j];
            this.maintenanceData[j] = tempDate;
          }
        }
      }
      let costOf = [];
      let monthlyMaintenanceSum = 0;
      let monthlyMaintenanceDate
      let dateOfFirst = this.maintenanceData[0].date;
      for (let i = 0; i < this.maintenanceData.length; i++) {
        if (this.maintenanceData[i].date == dateOfFirst) {
          monthlyMaintenanceSum += parseInt(this.maintenanceData[i].cost);
          monthlyMaintenanceDate = this.maintenanceData[i].date;
        }
        else {
          costOf.push({ cost: monthlyMaintenanceSum, date: monthlyMaintenanceDate });
          monthlyMaintenanceSum = 0;
          dateOfFirst = this.maintenanceData[i].date;
          monthlyMaintenanceSum += parseInt(this.maintenanceData[i].cost);
          monthlyMaintenanceDate = this.maintenanceData[i].date;
        }
      }
      costOf.push({ cost: monthlyMaintenanceSum, date: monthlyMaintenanceDate });
      this.maintenanceData = costOf;
      for (let i = 0; i < this.maintenanceData.length - 1; i++) {
        for (let j = (i + 1); j < this.maintenanceData.length; j++) {
          if (this.maintenanceData[i].date > this.maintenanceData[j].date) {
            let tempDate = this.maintenanceData[i]
            this.maintenanceData[i] = this.maintenanceData[j];
            this.maintenanceData[j] = tempDate;
          }
        }
      }
      console.log('consoole of = ' + JSON.stringify(this.maintenanceData));
      this.maintenanceData.forEach(element => {

        this.maintenanceCost.push(element.cost);
        this.maintenanceDate.push(element.date);
        this.years.push(element);
      });
      // to start maintenance graph value from 0
      this.maintenanceCost.push(0);
    }

  }
  mileageDataSetting() {

    this.mileage_loop_counter = 0;

    if (this.mileageDataOriginal.length > 0) {
      this.mileageDataOriginal.forEach(element => {
        let date = element.mileageDateString;
        console.log('date = ' + date)
        let spliteDate = date.split('-')
        this.mileageData.push({ cost: element.mileageCost, date: spliteDate[2] })
        this.mileage_loop_counter ++;
      });

      let costOf = [];
      let monthlyMileageSum = 0;
      let monthlyMileageDate
      let dateOfFirst = this.mileageData[0].date;
      for (let i = 0; i < this.mileageData.length; i++) {
        if (this.mileageData[i].date == dateOfFirst) {
          monthlyMileageSum += parseInt(this.mileageData[i].cost);
          monthlyMileageDate = this.mileageData[i].date;
        }
        else {
          costOf.push({ cost: monthlyMileageSum, date: monthlyMileageDate });
          monthlyMileageSum = 0;
          dateOfFirst = this.mileageData[i].date;
          monthlyMileageSum += parseInt(this.mileageData[i].cost);
          monthlyMileageDate = this.mileageData[i].date;
        }
      }
      costOf.push({ cost: monthlyMileageSum, date: monthlyMileageDate });
      this.mileageData = costOf;
      for (let i = 0; i < this.mileageData.length - 1; i++) {
        for (let j = (i + 1); j < this.mileageData.length; j++) {
          if (this.mileageData[i].date > this.mileageData[j].date) {
            let tempDate = this.mileageData[i]
            this.mileageData[i] = this.mileageData[j];
            this.mileageData[j] = tempDate;
          }
        }
      }
      this.mileageData.forEach(element => {
        this.mileageCost.push(element.cost);
        this.mileageDate.push(element.date);
        this.years.push(element);
      });
      // to start milegae graph value from 0
      this.mileageCost.push(0);

    }

  }
  yearDataSetting() {
    if (this.years.length > 0) {
      let costOf = [];
      let yearsSum = 0;
      let yearsDate
      let dateOfFirst = this.years[0].date;
      for (let i = 0; i < this.years.length; i++) {
        if (this.years[i].date == dateOfFirst) {
          yearsSum += parseInt(this.years[i].cost);
          yearsDate = this.years[i].date;
        }
        else {
          costOf.push({ cost: yearsSum, date: yearsDate });
          yearsSum = 0;
          dateOfFirst = this.years[i].date;
          yearsSum += parseInt(this.years[i].cost);
          yearsDate = this.years[i].date;
        }
      }
      costOf.push({ cost: yearsSum, date: yearsDate });
      this.years = costOf;
      for (let i = 0; i < this.years.length - 1; i++) {
        for (let j = (i + 1); j < this.years.length; j++) {
          if (this.years[i].date > this.years[j].date) {
            let tempDate = this.years[i]
            this.years[i] = this.years[j];
            this.years[j] = tempDate;
          }
        }
      }
      this.years.forEach(element => {
        this.yearCost.push(element.cost);
        this.yearDate.push(element.date);
      });
    }
  }
}
