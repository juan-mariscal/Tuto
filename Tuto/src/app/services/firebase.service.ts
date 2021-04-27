import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Account, Student, Tutor} from '../modal/Account';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usertype ="";
  uid='';
  isTutor: boolean = false;
  showLogin: boolean  = true;
  private students: Observable<Student[]>;
  private studentCollection: AngularFirestoreCollection<Student>;

  private tutors: Observable<Tutor[]>;
  private tutorCollection: AngularFirestoreCollection<Tutor>;
  constructor(private afs: AngularFirestore) {
    this.studentCollection = this.afs.collection<Student>('students');
    // this.noteCollection = this.afs.collection<Note>('notes',ref => ref.where('uid', '==', 'large'));

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
  }
  getStudent(id: string): Observable<Student> {
    return this.studentCollection.doc<Student>(id).valueChanges().pipe(
        take(1),
        map(student => {
          student.id = id;
          return student;
        })
    );
  }
  /*load_my_orders(){ //after user login, call this function
    var user = firebase.auth().currentUser;
    //console.log(user.uid);
    var uid=user.uid;
    // this.noteCollection = this.afs.collection<Note>('notes');
    this.Collection = this.afs.collection<Order>('orders',ref => ref.where('uid', '==', uid));

    this.orders = this.orderCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            // console.log(data)
            const id = a.payload.doc.id;
            console.log(id)
            // console.log("run after aadding new node? ")
            return { id, ...data };
          });
        })
    );
    //console.log("orders  loaded...")
  }*/

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
