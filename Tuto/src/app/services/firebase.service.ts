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
  private students: Observable<Student[]>;
  private studentCollection: AngularFirestoreCollection<Student>;
  private student: Student;
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
  setCurrentUser(){
    //var user = firebase.auth().currentUser;
    //var uid=user.uid;
    this.students.subscribe(console.log);
  }
}
