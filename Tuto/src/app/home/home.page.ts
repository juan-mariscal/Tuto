import { AfterViewInit, OnInit, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit{
  hideMe = false;

  constructor(private router: Router, public fbService: FirebaseService,
    public angularFire: AngularFireAuth, public loadingController: LoadingController) {}

  ngOnInit(){

  }
  async ngAfterViewInit(){
    const loading = await this.loadingController.create({
   cssClass: 'my-custom-class',
   message: 'Please wait...',
   duration: 2000
 });
 await loading.present();
  }

  ionViewDidEnter(){
    console.log(this.fbService.getUsertype());
    if(this.fbService.getUsertype() == 'tutor'){
      this.router.navigate(['student-list'])
    }
    else if(this.fbService.getUsertype()=='student'){
      this.router.navigate(['tutor-list'])
    }
  }
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
  goToMyProfile(){
    if(this.fbService.getUsertype() == 'tutor'){
      this.router.navigate(["tutor-profile"])
    }
    else{
      this.router.navigate(["student-profile"])
    }
  }
}
