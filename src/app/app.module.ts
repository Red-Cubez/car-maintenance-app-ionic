import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { SettingsPage } from '../pages/settings/settings';
import { SetGasMileagePage } from '../pages/set-gas-mileage/set-gas-mileage';
import { GasMileageDetailPage } from '../pages/gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../pages/maintenance-cost-detail/maintenance-cost-detail';
import { SetMaintenanceCostPage } from '../pages/set-maintenance-cost/set-maintenance-cost';
import { CarDetailPage } from '../pages/car-detail/car-detail';
import { CarDataProvider } from '../providers/car-data/car-data';
import { MaintenanceDataProvider } from '../providers/maintenance-data/maintenance-data';
import { MileageDataProvider } from '../providers/mileage-data/mileage-data';
import { IonicStorageModule } from '@ionic/storage';
import { ReportPage } from '../pages/report/report';
import { ChartModule } from 'angular2-highcharts';
import { ChartsModule} from'ng2-charts';
import * as highcharts from 'Highcharts';
import { SettingDataProvider } from '../providers/setting-data/setting-data';
import { FinalDataProvider } from '../providers/final-data/final-data';
import { MaintenanceGraphProvider } from '../providers/maintenance-graph/maintenance-graph';
import { YearMaintenanceProvider } from '../providers/year-maintenance/year-maintenance';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemPage,
    SettingsPage,
    SetGasMileagePage,
    GasMileageDetailPage,
    MaintenanceCostDetailPage,
    SetMaintenanceCostPage,
    CarDetailPage,
    ReportPage

  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartModule.forRoot(highcharts),
    ChartsModule
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemPage,
    SettingsPage,
    SetGasMileagePage,
    GasMileageDetailPage,
    MaintenanceCostDetailPage,
    SetMaintenanceCostPage,
    CarDetailPage,
    ReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarDataProvider,
    MaintenanceDataProvider,
    MileageDataProvider,
    IonicStorageModule,
    SettingDataProvider,
    FinalDataProvider,
    MaintenanceGraphProvider,
    YearMaintenanceProvider
  ]
})
export class AppModule {}
