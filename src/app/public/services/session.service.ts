import { Injectable, inject } from '@angular/core';
import { Patient } from 'src/app/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { pipe, tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )
  private currentUser!:any

  constructor() { }

  getPatientSessions( patientId : string ){
    const url = `${ this.baseUrl }/session/${patientId}`;
    return this.http.get( url )
    .pipe(
      tap((res)=> console.log(res)),
      catchError((err)=> of(err))
    )
  }

  saveSession(patientId:string, session:any){
    const url = `${ this.baseUrl }/session/${patientId}`;
    return this.http.post(url, { session } )
    .pipe(
      tap((res)=> console.log(res)),
      catchError((err)=> of(err))
    )
  }

  getSessionsByDate( date: Date ){
    const url = `${ this.baseUrl }/session/date/${date}`;
    return this.http.get( url )
    .pipe(
      tap((res)=> console.log(res)),
      catchError((err)=>of(err))
    )
  }
}
