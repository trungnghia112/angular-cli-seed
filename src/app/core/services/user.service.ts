import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { UserModel } from '@app/core/models/user';

import { LocalStorageService } from '@app/core/services/local-storage.service';
import { ApiService } from '@app/core/services/api.service';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<UserModel>(new UserModel());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.localStorageService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          (data: any) => this.setAuth(data.user),
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: UserModel) {
    // Save JWT sent from server in localstorage
    this.localStorageService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.localStorageService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next(new UserModel());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<UserModel> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .pipe(map(
        (data: any) => {
          this.setAuth(data.user);
          return data;
        }
      ));
  }

  getCurrentUser(): UserModel {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<UserModel> {
    return this.apiService
      .put('/user', {user})
      .pipe(map((data: any) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

}
