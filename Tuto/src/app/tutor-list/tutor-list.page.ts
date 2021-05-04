import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../modal/Account';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.page.html',
  styleUrls: ['./tutor-list.page.scss'],
})
export class TutorListPage implements OnInit {
  private tutors: Observable<Tutor[]>;

  constructor(private router: Router, public fbService: FirebaseService,
    public angularFire: AngularFireAuth) { }

  ngOnInit(): void {
    console.log("tutor-list page")
    this.tutors = this.fbService.getTutorList();
  }
  goToMyProfile(){
    if(this.fbService.getUsertype() == 'tutor'){
      this.router.navigate(["tutor-profile"])
    }
    else{
      this.router.navigate(["student-profile"])
    }
  }
  logout() {
    this.angularFire.signOut().then(() => {
      console.log("Logging off...");
      let user = this.angularFire.currentUser;
      console.log(user);
      this.fbService.uid = ''
      
      this.router.navigate(["/"]);
    });
  }
}
