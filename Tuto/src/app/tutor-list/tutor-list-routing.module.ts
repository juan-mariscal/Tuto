import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorListPage } from './tutor-list.page';

const routes: Routes = [
  {
    path: '',
    component: TutorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorListPageRoutingModule {}
