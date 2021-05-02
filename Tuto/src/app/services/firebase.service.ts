import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Account, Student, Tutor, Review} from '../modal/Account';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usertype ="";
  uid='';
  isTutor: boolean = false;
  showLogin: boolean  = true;
  //hideMe: boolean = true;

  private students: Observable<Student[]>;
  private studentCollection: AngularFirestoreCollection<Student>;

  private tutors: Observable<Tutor[]>;
  private tutorCollection: AngularFirestoreCollection<Tutor>;

  private favTutors: Observable<Tutor[]>;
  private favTutorCollection: AngularFirestoreCollection<Tutor>;

  private reviews: Observable<Review[]>;
  private reviewsCollection: AngularFirestoreCollection<Review>;

  constructor(private afs: AngularFirestore, private router: Router) {
    //Sets up Students
    this.studentCollection = this.afs.collection<Student>('students');
    this.students = this.studentCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            // console.log(data)
            const id = a.payload.doc.id;
            // console.log("run after aadding new node? ")
            return { id, ...data };
          });
        })
    );

    //Sets up Tutors
    this.tutorCollection = this.afs.collection<Tutor>('tutors');
    this.tutors = this.tutorCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  load_fav_tutors(){
    var user = firebase.auth().currentUser;
    var uid=user.uid;
    this.favTutorCollection = this.afs.collection<Tutor>('reviews',ref => ref.where('uid', '==', uid));

    this.favTutors = this.favTutorCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           console.log(id)
           return { id, ...data };
         });
        })
      );
  }

  load_reviews(uid: string){
    //var user = firebase.auth().currentUser;
    //var uid=user.uid;
    this.reviewsCollection = this.afs.collection<Review>('reviews',ref => ref.where('uid', '==', uid));

    this.reviews = this.reviewsCollection.snapshotChanges().pipe(
       map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            console.log(id)
           return { id, ...data };
          });
        })
      );
  }

  //Returns list of all students
  getStudentList(): Observable<Student[]> {
    return this.students;
  }

  addReview(review: Review): Promise<DocumentReference> {
    var user1 = firebase.auth().currentUser;
    review.uid = this.uid;
    return this.reviewsCollection.add(review);
  }

  addFavorite(tutor: Tutor): Promise<DocumentReference> {
    var user1 = firebase.auth().currentUser;
    tutor.uid = this.uid
    return this.favTutorCollection.add(tutor);
  }
  checkIfFavorited(temp_tutor: Tutor){
    console.log("temp_tutor uid: " + temp_tutor.uid)
    this.favTutors.forEach(tutors=>{
      tutors.forEach(tutor=>{
        console.log("tutor id: " + tutor.id)
        if(tutor.id == temp_tutor.uid){
          console.log("returning true")
          return true;
        }
      })
    })
    return false;
  }
  getFavorites(): Observable<Tutor[]> {
    return this.favTutors;
  }

  //Returns specific student
  getStudent(id: string): Observable<Student> {
    //return this.studentCollection.doc(id).valueChanges().pipe(
    return this.studentCollection.doc<Student>(id).valueChanges().pipe(
        take(1),
        map(student => {
          student.id = id;
          return student;
        })
    );
  }

  //Returns list of all tutors
  getTutorList(): Observable<Tutor[]> {
    return this.tutors;
  }

  //Returns specifid tutor
  getTutor(id: string): Observable<Tutor> {
    return this.tutorCollection.doc<Tutor>(id).valueChanges().pipe(
        take(1),
        map(tutor => {
          tutor.id = id;
          return tutor;
        })
    );
  }

  editStudent(student: Student): Promise<void> {
    return this.studentCollection.doc(this.uid).update({ name: student.name, dob: student.dob, pfp: student.pfp,
    phone_number: student.phone_number, email: student.email, message: student.message });
  }

  editTutor(tutor: Tutor): Promise<void> {
    return this.tutorCollection.doc(this.uid).update({ name: tutor.name, dob: tutor.dob, pfp: tutor.pfp,
    phone_number: tutor.phone_number, email: tutor.email, message: tutor.message });
  }

  setUID(uid){
    this.uid = uid;
    console.log(this.uid);
  }

  setUsertype(type){
    this.usertype=type;
  }

  getUsertype(){
    return this.usertype;
  }

  getUserID() {
    return this.uid;
  }

}
