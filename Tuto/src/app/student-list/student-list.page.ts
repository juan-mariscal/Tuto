import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../modal/Account';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  private students: Observable<Student[]>;

  constructor(private router: Router, public fbService: FirebaseService,
    public angularFire: AngularFireAuth) { }

  ngOnInit(): void {
    console.log("student-list page")
    this.students = this.fbService.getStudentList();
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
