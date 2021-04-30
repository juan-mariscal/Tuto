import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit, AfterViewInit {
  /*student: Student = {
    id: '',
    name: '',
    dob: '',
    pfp: '',
    phone_number: '',
    email: '',
    message: '',
    uid: ''
  }*/
  account: Account = {
    id: '',
    name: '',
    dob: '',
    pfp: '',
    phone_number: '',
    email: '',
    message: '',
    uid: ''
  }
  user= {email:"", password:"",type:""};
  constructor(public afAuth: AngularFireAuth, private fbService: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
      const email = this.activatedRoute.snapshot.paramMap.get('email');
      console.log("email is: " + email)
      if (email) {
        this.user.email = email;
      }
      const password = this.activatedRoute.snapshot.paramMap.get('password');
      console.log("password is: " + password)
      if (password) {
        this.user.password = password;
      }
      const type = this.activatedRoute.snapshot.paramMap.get('type');
      console.log("password is: " + type)
      if (type) {
        this.user.type = type;
      }
    }
  createAccount(){
    //this.student.uid = this.fbService.getUserID();
    this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password).then(user => {
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
            if(this.user.type == "student"){
            db.collection("students").doc(this.fbService.getUserID()).set({
              name: this.account.name,
              dob: this.account.dob,
              pfp: this.account.pfp,
              phone_number: this.account.phone_number,
              email: this.account.email,
              message: this.account.message,
              uid: this.fbService.getUserID()
           })
         }
         if(this.user.type == "tutor"){
         db.collection("tutors").doc(this.fbService.getUserID()).set({
           name: this.account.name,
           dob: this.account.dob,
           pfp: this.account.pfp,
           phone_number: this.account.phone_number,
           email: this.account.email,
           message: this.account.message,
           uid: this.fbService.getUserID()
        })
      }

    })
    /*var db = firebase.firestore();
    db.collection("students").doc(this.fbService.getUserID()).set({
      name: this.student.name,
      dob: this.student.dob,
      pfp: this.student.pfp,
      phone_number: this.student.phone_number,
      email: this.student.email,
      message: this.student.message,
      uid: this.student.uid
   })*/
   //this.fbService.createStudent(this.student);
    this.router.navigate(["/home"])
  }
}
