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
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public cardDataProvider: CarDataProvider, ) {

  }
  ionViewDidLoad() {
    this.indexNumber = this.navParams.get('indexOfRecord');
    this.cardDataProvider.getCardata().then(res => {
      this.mileageDataOriginal = res[this.indexNumber].carMileageDetail;
      this.maintenanceDataOriginal = res[this.indexNumber].carMaintenanceDetail;
      this.name = res[this.indexNumber].carMake;


      this.maintenanceDataSetting();
      this.mileageDataSetting();
      this.yearDataSetting();

      this.createMileageGraph();
      this.createMaintenanceGraph();
      this.createYearlyGraph();
    })
    console.log('ionViewDidLoad ReportPage');

  }

  dismissing() {
    this.viewCtrl.dismiss();
  }
  createMaintenanceGraph() {
    this.barChartMaintenance = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.maintenanceDate,
        datasets: [{
          label: "Cost",
          data: this.maintenanceCost,
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
            title: 'Cost'
          }]
        }
      }
    });
  }

  createMileageGraph() {

    this.barChartMileage = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: this.mileageDate,
        datasets: [{
          label: '# of Votes',
          data: this.mileageCost,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }

    });
    //   data: {
    //     labels: this.mileageDate,
    //     datasets: [{
    //       label: "Fuel",
    //       data: this.mileageCost,
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         title: 'Fuel'
    //       }]
    //     }
    //   }
    // });
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
            data: this.yearCost,
            spanGaps: false,
          }
        ]
      }

    });
  }
  maintenanceDataSetting() {
    if (this.maintenanceDataOriginal.length > 0) {
      this.maintenanceDataOriginal.forEach(element => {
        let date = element.maintenanceDateString;
        console.log('date = ' + date)
        let spliteDate = date.split('-')
        this.maintenanceData.push({ cost: element.maintenanceCost, date: spliteDate[2] })
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

    }

  }
  mileageDataSetting() {

    if (this.mileageDataOriginal.length > 0) {
      this.mileageDataOriginal.forEach(element => {
        let date = element.mileageDateString;
        console.log('date = ' + date)
        let spliteDate = date.split('-')
        this.mileageData.push({ cost: element.mileageCost, date: spliteDate[2] })
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
        // this.yearCost.push(element.cost)
        // this.yearDate.push(element.date)
        this.years.push(element);
      });

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
