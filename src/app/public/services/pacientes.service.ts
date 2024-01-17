import { Injectable, inject } from '@angular/core';
import { Patient } from 'src/app/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { pipe, tap, catchError, of, map } from 'rxjs';

interface PatientResponse {
  patients:Patient[]
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )
  private currentUser!:any

  constructor() {
    this.currentUser = localStorage.getItem('user');
    if (this.currentUser){
      this.currentUser = JSON.parse(this.currentUser);
    } 
   }

  createPatient( patientData:any ){
    const url = `${ this.baseUrl }/patient`;
    const newPatientData = { ...patientData, fee:40000, isActive: true, therapistID: this.currentUser._id }
    return this.http.post(url, newPatientData )
    .pipe(
      tap((res)=> console.log(res)),
      catchError((err)=> of(err))
    )
  }

  fetchPatients(queryParams:any){
    const url = `${ this.baseUrl }/patient/?therapistId=${this.currentUser._id}&minDate=${queryParams.minDate}&maxDate=${queryParams.maxDate}`;
    return this.http.get<PatientResponse>(url)
    .pipe(
      map((res)=> res),
      catchError((err)=> of(err))
    )
  }

  getPatientById(patientId:any){
    const url = `${ this.baseUrl }/patient/detail/${patientId}`;
    return this.http.get(url)
    .pipe(
      tap((res)=> console.log(res)),
      catchError((err)=> of(err))
    )
  }
}
