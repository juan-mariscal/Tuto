import { Component, OnInit } from '@angular/core';
import { Review } from '../modal/Account';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.page.html',
  styleUrls: ['./view-reviews.page.scss'],
})
export class ViewReviewsPage implements OnInit {
  private reviews: Observable<Review[]>;

  constructor(public afAuth: AngularFireAuth, private fbService: FirebaseService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.review.tuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.reviews = this.fbService.getReviews();
  }
  /*ngAfterViewInit(){

  }*/

}
