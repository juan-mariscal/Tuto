import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit, AfterViewInit {

  //default src: http://s3.amazonaws.com/37assets/svn/765-default-avatar.png
  student: Student = {
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
    this.fbService.getStudent(this.fbService.getUserID()).subscribe(studentData => {
          this.student = studentData;
        });
  }
  ngAfterViewInit(): void {
    /*console.log("we are here");
    this.fbService.getStudent(this.fbService.getUserID()).subscribe(studentData => {
          this.student = studentData;
        });*/
  }
  ionViewWillEnter(){
    console.log("we are here");
    this.fbService.getStudent(this.fbService.getUserID()).subscribe(studentData => {
          this.student = studentData;
        });
  }
}
