import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenanceCostDetailPage } from './maintenance-cost-detail';

@NgModule({
  declarations: [
    MaintenanceCostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenanceCostDetailPage),
  ],
})
export class MaintenanceCostDetailPageModule {}
