import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FabricPage } from './fabric.page';

const routes: Routes = [
  {
    path: '',
    component: FabricPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FabricPageRoutingModule {}
