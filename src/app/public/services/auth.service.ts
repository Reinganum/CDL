import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse, CheckTokenResponse } from '../../interfaces'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient )

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() )
  public authStatus = computed( () => this._authStatus() )

  constructor() { }

  private setAuthentication( user: User, token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify( user ) )
    return true
  }  

  login( email: string, password: string):Observable<boolean>{
    const url = `${ this.baseUrl }/auth/login`;
    const body = { email, password};
    return this.http.post<LoginResponse>( url, body )
    .pipe(
      map( ({ user, token }) =>  this.setAuthentication( user, token)),
      catchError( ( err )=> {
        return throwError( err )
      })
    )
  }

  checkAuthStatus():Observable<boolean>{
    const url = `${ this.baseUrl }/auth/refresh`;
    const token = localStorage.getItem('token');
    if ( !token ) return of(false);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);
    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map( ({ user , token })=> this.setAuthentication( user, token )),
        catchError(()=> of(false))
      )
  }

  get getLoggedUser(){
    return this._currentUser
  }

  register( userInfo:any ){
    let { firstName, lastName, dob, email, mobile, password, confirmationPass } = userInfo
    mobile=Number(mobile)
    const url = `${ this.baseUrl }/auth/register`;
    return this.http.post(url, {firstName, lastName, dob, email, mobile, password, confirmationPass} )
    .pipe(
      tap((res)=> console.log(res)),
      catchError((err)=> of(err))
    )
  }
}