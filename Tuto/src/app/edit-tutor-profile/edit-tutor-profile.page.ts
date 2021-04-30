import { Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-edit-tutor-profile',
  templateUrl: './edit-tutor-profile.page.html',
  styleUrls: ['./edit-tutor-profile.page.scss'],
})
export class EditTutorProfilePage implements OnInit {
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
  updateStudent(){
    this.fbService.editTutor(this.tutor);
    this.router.navigate(["/tutor-profile"])
  }

}
