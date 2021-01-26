import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  signUp(email: String, password: string) {
    this.spinner.show();
    return Observable.create((observer) => {
      this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBky0beJjNV6k5hzZ0uyzqDSvcULJ4n448", {
        email: email,
        password: password,
        returnSecureToken: true
      }).subscribe(response => {
        this.spinner.hide();
        observer.next(response);
      }, (err: any) => {
        this.spinner.hide();
        observer.error(err);
      });
    });
  }

  signIn(email: String, password: string) {
    this.spinner.show();
    return Observable.create((observer) => {
      this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBky0beJjNV6k5hzZ0uyzqDSvcULJ4n448", {
        email: email,
        password: password,
        returnSecureToken: true
      }).subscribe(response => {
        this.spinner.hide();
        observer.next(response);
      }, (err: any) => {
        this.spinner.hide();
        observer.error(err);
      });
    });
  }



}
