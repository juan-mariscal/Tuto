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

  account: Account;

  constructor(public afAuth: AngularFireAuth, private fbService: FirebaseService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  createReview() {
    //console.log(this.student.uid);
    //this.review.uid = this.student.uid;
    var user1 = firebase.auth().currentUser;
    this.review.uid = user1.uid;

    this.fbService.addReview(this.review).then((doc) => {
      console.log(doc);
      this.router.navigateByUrl('/home');
    }, err => {
    });
  }

}
