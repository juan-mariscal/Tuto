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
export class TutorProfilePage implements OnInit, AfterViewInit {

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
    suid: '',
    tuid:''
  }

  private reviews: Observable<Review[]>;

  constructor(private fbService: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("ngOnInit")
    this.reviews = this.fbService.getReviews();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id){
    console.log("am myself");
    console.log("subscribing data");
    this.fbService.load_reviews(this.review.tuid)

    this.fbService.getTutor(this.fbService.getUserID()).subscribe(tutorData => {
          this.tutor = tutorData;
        });
    this.ownUser = true;
  }

  //this.reviews = this.fbService.getReviews();
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.fbService.load_reviews(this.review.tuid)
      console.log("subscribing data");

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
      this.fbService.load_reviews(this.review.tuid)
      console.log("subscribing data");
      
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
