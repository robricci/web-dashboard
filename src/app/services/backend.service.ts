import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Ticket} from '../dto/Ticket';
import {catchError} from 'rxjs/operators';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private ws: WebSocketSubject<any>;

  constructor(private http: HttpClient) { }

  generateTicket(jwt: string): Observable<Ticket> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      })
    };
    return this.http.get<Ticket>('http://localhost:8080/api/city/tickets', httpOptions)
      /*.pipe(
        catchError(this.handleError<Ticket>('generateTicket', new Ticket()))
      )*/;
  }

  connect(ticket: string): Observable<any> {
    this.ws = webSocket('ws://localhost:8080/api/city/notifications' + '?ticket=' + ticket);
    return this.ws.asObservable()
      .pipe(catchError(this.handleError<number>('connect', -1)));
  }

  send(msg: any): void {
    this.ws.next(msg);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
