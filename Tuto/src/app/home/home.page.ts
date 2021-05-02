import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hideMe = false;

  constructor(private router: Router, public fbService: FirebaseService,
    public angularFire: AngularFireAuth) {}
  
  logout() {
    this.angularFire.signOut().then(() => {
      console.log("Logging off...");
      let user = this.angularFire.currentUser;
      console.log(user);
      this.fbService.uid = ''
      this.hideMe = true;
      this.router.navigate(["/"]);
    });
  }
}
