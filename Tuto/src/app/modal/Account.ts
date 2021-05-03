export interface Account {
  id?: any;
  name: string;
  dob: string
  pfp: string;
  phone_number: string;
  email: string;
  message: string;
  uid:string;
}

export interface Student {
    id?: any;
    name: string;
    dob: string
    pfp: string;
    phone_number: string;
    email: string;
    message: string;
    uid:string;
}
export interface Tutor {
  id?: any;
  name: string;
  dob: string
  pfp: string;
  phone_number: string;
  email: string;
  message: string;
  uid:string;
}

export interface Review {
  id?: any;
  rating: any;
  message: string;
  suid: string;
  tuid: string;
}
