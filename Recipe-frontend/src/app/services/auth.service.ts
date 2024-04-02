import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { LoginDetails } from '../interfaces/login-details';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/loggedinuser';

interface ResultData {
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false,
  });
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'https://u06-fullstack-recipe-app-matildaak.onrender.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}


  getLoginStatus() {
    return this.loggedIn.value.loginState;
  }

  private updateLoginState(loginState: LoggedInUser) {
    this.loggedIn.next(loginState);
  }

  loginUser(loginDetails: LoginDetails) {
    this.http
      .post<any>(this.baseUrl + 'login', loginDetails, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState({
          user: result.user,
          loginState: true,
        });
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer ' + result.token
        );
      });
  }
  
  logOut() {
    this.http
    .post<any>(this.baseUrl + 'logout', {}, this.httpOptions)
    .pipe(catchError(this.handleError))
    .subscribe((result) => {
      console.log(result);
      this.updateLoginState({
        user: result.user,
        loginState: false,
      });
      this.httpOptions.headers = this.httpOptions.headers.set(
        'Authorization',
        'Bearer ');
    });
  }
  
  getCurrentUser() {
    let user: User;
    user = {
      id: 0,
      name: '',
      email: '',
    };
    this.http
      .get<User[]>(
        this.baseUrl + 'getUser/' + this.loggedIn.value.user?.id,
        this.httpOptions
      )
      .subscribe((res) => (user = res[0]));
    return user;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('An error occurred', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later')
    );
  }
}