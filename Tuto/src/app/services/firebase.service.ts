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
  constructor(private afs: AngularFirestore) {

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
}
