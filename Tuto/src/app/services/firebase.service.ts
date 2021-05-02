import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Account, Student, Tutor} from '../modal/Account';
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
            // console.log(data)
            const id = a.payload.doc.id;
            // console.log("run after aadding new node? ")
            return { id, ...data };
          });
        })
    );
  }

  //Returns list of all students
  getStudentList(): Observable<Student[]> {
    return this.students;
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
