import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTutorProfilePage } from './edit-tutor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditTutorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTutorProfilePageRoutingModule {}
