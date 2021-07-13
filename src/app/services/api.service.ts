import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginResponse} from '../dto/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static BASE_ENDPOINT = 'http://localhost:8080/api/city';
  private static LOGIN_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/users/login';
  private static ROUTES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/routes';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const loginObj = { username, password};
    return this.http.post<LoginResponse>(ApiService.LOGIN_API_ENDPOINT, loginObj);
  }

  routes(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(ApiService.ROUTES_API_ENDPOINT);
  }
}
