export interface Patient {
    firstName:     string;
    lastName:     string;
    contactNumber: string;
    age:           number;
    sessions:      Session[];
    fee:           number;
    email:         string;
    booking:       number;
    hour:          number;
    startDate:     string;
    type:          string;
    nextSession:   Date;
    responsible?:  Responsible;
    school?:       string;
    dob?:          string;

  }

export interface Session{
  date:     string;
  type:     string;
  fee:      number;
  abstract: string;
}

export interface Responsible { 
  fullName:      string;
  contactNumber: string;
  sessions:      Session[];
  email:         string;
  relationship:  string;
  address:       string;
}