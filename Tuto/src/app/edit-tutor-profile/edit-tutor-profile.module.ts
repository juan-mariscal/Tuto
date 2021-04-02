import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTutorProfilePageRoutingModule } from './edit-tutor-profile-routing.module';

import { EditTutorProfilePage } from './edit-tutor-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTutorProfilePageRoutingModule
  ],
  declarations: [EditTutorProfilePage]
})
export class EditTutorProfilePageModule {}
