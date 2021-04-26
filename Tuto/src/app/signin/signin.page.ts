import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  // Default demo user account
  user = {email:"luffy@gmail.com", password:"OnePiece"}

  constructor(public afAuth: AngularFireAuth,
    private fbService: FirebaseService,
    private router: Router,
    public firebase: AngularFirestore) { }

  ngOnInit() {
  }

  signInWithEmail(email: string, password: string) {
    console.log("signin ...");
    this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      //navigate to user profile
      console.log(user.user.email, user.user.uid);
      
      var user1 = firebase.auth().currentUser;
      console.log(user1.uid)
      this.fbService.setUID(user.user.uid);
      // fbService
      var db = firebase.firestore();
      var self = this;
      db.collection("usertype").where("uid", "==", user1.uid)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshot
                  console.log(doc.id, " =>", doc.data());
                  var type = doc.data().usertype;
                  console.log("usertype: "+type);
                  self.fbService.setUsertype(type);
                  if(type == 'tutor') {
                    self.fbService.isTutor = true;
                  }
                });
            })
            .catch(function(error) {
                console.log("Error getting info: ", error);
            });
            this.router.navigateByUrl('/');
    })
    .catch(error => {
      console.log(error)
    });
    this.fbService.showLogin = false;
  }

  // Facebook Login
  loginFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    var self=this;
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
    
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        self.fbService.setUID(user.uid);
        //this.fbService.load_my_orders();
        this.router.navigateByUrl('/');
    
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

  loginGoogle(){
  	var provider = new firebase.auth.GoogleAuthProvider();
  	var self=this;
  	firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
        self.fbService.setUID(user.uid);
        // self.fbService.load_my_orders();
        self.fbService.setUsertype("student");
      this.router.navigateByUrl('/');


    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

}
