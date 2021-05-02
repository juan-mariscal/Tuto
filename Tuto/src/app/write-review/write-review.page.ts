import { Component, OnInit } from '@angular/core';
import { Review } from '../modal/Account';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.page.html',
  styleUrls: ['./write-review.page.scss'],
})
export class WriteReviewPage implements OnInit {

  review: Review = {
    id: '',
    rating: '',
    message: '',
    uid: ''
  }

  constructor(public afAuth: AngularFireAuth, private fbService: FirebaseService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  createReview() {
    
  }

}
