import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Account, Student, Tutor} from '../modal/Account'
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit, AfterViewInit {

  //default src: http://s3.amazonaws.com/37assets/svn/765-default-avatar.png
  student: Student = {
    id: '',
    name: '',
    dob: '',
    pfp: '',
    phone_number: '',
    email: '',
    message: '',
    uid: ''
  }
  ownUser = false;
  constructor(private fbService: FirebaseService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //const id = this.activatedRoute.snapshot.paramMap.get('id');
    //if(id) {
    console.log("initial")
      this.fbService.getStudent(this.fbService.getUserID()).subscribe(studentData => {
        this.student = studentData;
      });
      /*if(id == this.fbService.getUserID()){
        this.ownUser = true;*/
    //  }
    //}
    // console.log(this.fbService.getUsertype());
    // console.log(this.fbService.getUserID());
    // this.fbService.getStudent(this.fbService.getUserID()).subscribe(studentData => {
    //       this.student = studentData;
    //     });
  }
  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.fbService.getStudent(id).subscribe(studentData => {
        this.student = studentData;
      });
      if(id == this.fbService.getUserID()){
        this.ownUser = true;
      }
      else{
        this.ownUser = false;
      }
    }
  }
  ionViewWillEnter(){
    console.log("we are here");
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.fbService.getStudent(id).subscribe(studentData => {
        this.student = studentData;
      });
      if(id == this.fbService.getUserID()){
        this.ownUser = true;
      }
      else{
        this.ownUser = false;
      }
    }
    else{
    this.fbService.getStudent(this.fbService.getUserID()).subscribe(studentData => {
          this.student = studentData;
        });
        this.ownUser = true;
      }
    }
}
