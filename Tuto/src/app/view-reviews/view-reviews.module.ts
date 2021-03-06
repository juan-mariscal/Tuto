import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReviewsPageRoutingModule } from './view-reviews-routing.module';

import { ViewReviewsPage } from './view-reviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReviewsPageRoutingModule
  ],
  declarations: [ViewReviewsPage]
})
export class ViewReviewsPageModule {}
