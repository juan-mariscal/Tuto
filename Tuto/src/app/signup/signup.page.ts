import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user= {email:"", password:"",type:""};
  constructor(public afAuth: AngularFireAuth,private router:Router) { }

  ngOnInit() {
  }

  signUpWithEmail(email: string, password: string) {
  // Promise<firebase.auth.UserCredential>
  console.log(email,password);
  //you need to activate the authentication (password email) service in firbase project

  this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
		// navigate to user profile
		console.log(user.user.email, user.user.uid);

		var db = firebase.firestore();
		db.collection("usertype").add({
		            'uid':user.user.uid,
		              'usertype': this.user.type

		      })
		      .then(function(docRef) {
		          console.log("usetype written with ID: ", docRef.id);

		          //update this products arrays
		      })
		      .catch(function(error) {
		          console.error("Error adding document: ", error);
		      });

	})
	.catch(error => {
		console.log(error)
	});;


      this.router.navigate(["/new-account"])

}
}
