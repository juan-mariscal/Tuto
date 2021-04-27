import { Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {
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

}
