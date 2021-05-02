import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorListPageRoutingModule } from './tutor-list-routing.module';

import { TutorListPage } from './tutor-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorListPageRoutingModule
  ],
  declarations: [TutorListPage]
})
export class TutorListPageModule {}
