import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { retry } from 'rxjs/operators/retry';

import { environment } from '@env/environment';


@Injectable()
export class ApiService {
  apiUrl: string = environment.API;

  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string, params?: any): Observable<T> {
    if (typeof params === 'object') {
      params = '?' + this.paramsToString(params);
    }

    // console.log(this.apiUrl + url);

    return this.httpClient.get<any>(this.apiUrl + url, {params})
       .pipe(
        retry(3), // Retry this request up to 3 times.
        catchError(this.handleError('get', [])) // Any errors after the 3rd retry will fall through to the app.
      );
  }

  post<T>(url: string, body: any, params?: any): Observable<T> {
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }

    return this.httpClient.post<any>(this.apiUrl + url, body, {params})
      .pipe(
        catchError(this.handleError('post', []))
      );
  }

  put<T>(url: string, body: any, params?: any): Observable<T> {
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }

    return this.httpClient.put<any>(this.apiUrl + url, body, {params})
      .pipe(
        catchError(this.handleError('put', []))
      );
  }

  delete<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.delete<any>(this.apiUrl + url, {params})
      .pipe(
        catchError(this.handleError('delete', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    // this.messageService.add('messageService: ' + message);
    console.log('log error:', message);
  }

  private paramsToString(params: any): string {
    let str = '';
    if (params) {
      for (const param in params) {
        str += param + '=' + params[param] + '&';
      }
      str = str.slice(0, -1);
    }
    return str;
  }
}
