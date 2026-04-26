import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { Tab2Page } from './tab2.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    Tab2PageRoutingModule,
    FormsModule,
    Tab2Page
  ]
})
export class Tab2PageModule {}