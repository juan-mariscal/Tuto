import { Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-edit-student-profile',
  templateUrl: './edit-student-profile.page.html',
  styleUrls: ['./edit-student-profile.page.scss'],
})
export class EditStudentProfilePage implements OnInit {
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
  updateStudent(){
    this.fbService.editStudent(this.student);
    this.router.navigate(["/student-profile"])
  }
}
