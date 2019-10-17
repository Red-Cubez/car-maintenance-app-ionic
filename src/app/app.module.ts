import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { SetGasMileagePage } from '../pages/set-gas-mileage/set-gas-mileage';
import { GasMileageDetailPage } from '../pages/gas-mileage-detail/gas-mileage-detail';
import { MaintenanceCostDetailPage } from '../pages/maintenance-cost-detail/maintenance-cost-detail';
import { SetMaintenanceCostPage } from '../pages/set-maintenance-cost/set-maintenance-cost';
import { CarDataProvider } from '../providers/car-data/car-data';
import { EditCarmaintenancePage } from '../pages/edit-carmaintenance/edit-carmaintenance';
import { EditMileagePage } from '../pages/edit-mileage/edit-mileage';
import { EditCaritemPage } from '../pages/edit-caritem/edit-caritem';
import { SettingsPage } from '../pages/settings/settings';
import { EditcarPage } from "../pages/editcar/editcar";
import { DisclaimerPage } from "../pages/disclaimer/disclaimer";
import { AboutUsPage } from "../pages/about-us/about-us";

import { IonicStorageModule } from '@ionic/storage';
import { ReportPage } from '../pages/report/report';
import { ChartsModule} from'ng2-charts';
import { AdMobPro } from '@ionic-native/admob-pro';

import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemPage,
    SetGasMileagePage,
    GasMileageDetailPage,
    MaintenanceCostDetailPage,
    SetMaintenanceCostPage,
    ReportPage,
    SettingsPage,
    EditCarmaintenancePage,
    EditMileagePage,
    EditCaritemPage,
    EditcarPage,
    DisclaimerPage,
    AboutUsPage
  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  
    ChartsModule
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemPage,
    SetGasMileagePage,
    GasMileageDetailPage,
    MaintenanceCostDetailPage,
    SetMaintenanceCostPage,
    ReportPage,
    SettingsPage,
    EditCarmaintenancePage,
    EditMileagePage,
    EditCaritemPage,
    EditcarPage,
    DisclaimerPage,
    AboutUsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarDataProvider,
    IonicStorageModule,
    AdMobPro,
    FirebaseAnalytics
  ]
})
export class AppModule {}
