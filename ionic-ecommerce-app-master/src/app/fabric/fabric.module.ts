import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FabricPageRoutingModule } from './fabric-routing.module';

import { FabricPage } from './fabric.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FabricPageRoutingModule
  ],
  declarations: [FabricPage]
})
export class FabricPageModule {}
