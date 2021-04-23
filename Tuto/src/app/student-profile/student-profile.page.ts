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
  name = "hi"
  constructor(private fbService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.fbService.setCurrentUser();
  }

}
