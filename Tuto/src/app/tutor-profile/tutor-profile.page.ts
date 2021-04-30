import { Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.page.html',
  styleUrls: ['./tutor-profile.page.scss'],
})
export class TutorProfilePage implements OnInit {
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
  constructor(private fbService: FirebaseService, private router: Router) { }

  ngOnInit() {
    console.log(this.fbService.getUsertype());
    console.log(this.fbService.getUserID());
    this.fbService.getTutor(this.fbService.getUserID()).subscribe(tutorData => {
          this.tutor = tutorData;
        });
  }
  ionViewWillEnter(){
    console.log("we are here");
    this.fbService.getTutor(this.fbService.getUserID()).subscribe(tutorData => {
          this.tutor = tutorData;
        });
  }
}
