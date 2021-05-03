import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Account, Student, Tutor, Review} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.page.html',
  styleUrls: ['./tutor-profile.page.scss'],
})
export class TutorProfilePage implements OnInit,AfterViewInit {
  //default src: http://s3.amazonaws.com/37assets/svn/765-default-avatar.png
  tutor: Tutor = {
    id: '',
    name: '',
    dob: '',
    pfp: '',
    phone_number: '',
    email: '',
    message: '',
    uid: ''
  }
  ownUser = false;
  starName = 'star-outline'

  review: Review = {
    id: '',
    rating: '',
    message: '',
    uid: ''
  }

  constructor(private fbService: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("ngOnInit")
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id){
    console.log("am myself");
    console.log("subscribing data");
    this.fbService.getReview(id).subscribe(reviewData => {
      this.review = reviewData;
    })
    this.fbService.getTutor(this.fbService.getUserID()).subscribe(tutorData => {
          this.tutor = tutorData;
        });
    this.ownUser = true;
  }
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      console.log("subscribing data");
      this.fbService.getReview(id).subscribe(reviewData => {
        this.review = reviewData;
      })
      this.fbService.getTutor(id).subscribe(tutorData => {
        this.tutor = tutorData;
      });
      if(id == this.fbService.getUserID()){
        console.log("am myself");
        this.ownUser = true;
      }
      else{
        this.ownUser = false;
      }
    }
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      console.log("subscribing data");
      this.fbService.getReview(id).subscribe(reviewData => {
        this.review = reviewData;
      })
      this.fbService.getTutor(id).subscribe(tutorData => {
        this.tutor = tutorData;
      });
      if(id == this.fbService.getUserID()){
        console.log("am myself");
        this.ownUser = true;
      }
      else{
        this.ownUser = false;
      }
    }
    else {
    this.fbService.getTutor(this.fbService.getUserID()).subscribe(tutorData => {
          this.tutor = tutorData;
        });
        this.ownUser = true;
      }
  }

  ionViewDidEnter() {
    this.fbService.load_reviews(this.tutor.uid);
    console.log('ionViewDidEnter');
    console.log(this.fbService.checkIfFavorited(this.tutor));
    if(this.fbService.checkIfFavorited(this.tutor)){
      console.log("favorited")
      this.starName = "star";
    }
    else{
      console.log("not favorited")
      this.starName = "star-outline";
    }
  }

  favorited(){
    if(this.starName == "star-outline"){
      this.starName = "star"
      this.fbService.addFavorite(this.tutor);
    }
  }
}
