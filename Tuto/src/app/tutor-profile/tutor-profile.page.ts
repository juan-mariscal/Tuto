import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

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
  constructor(private fbService: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id){
    console.log(this.fbService.getUsertype());
    console.log(this.fbService.getUserID());
    this.fbService.getTutor(this.fbService.getUserID()).subscribe(tutorData => {
          this.tutor = tutorData;
        });
    this.ownUser = true;
  }
  }
  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.fbService.getTutor(id).subscribe(tutorData => {
        this.tutor = tutorData;
      });
      if(id == this.fbService.getUserID()){
        this.ownUser = true;
      }
      else{
        this.ownUser = false;
      }
    }
  }
  ionViewWillEnter(){
    console.log("we are here");
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.fbService.getTutor(id).subscribe(tutorData => {
        this.tutor = tutorData;
      });
      if(id == this.fbService.getUserID()){
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
}
