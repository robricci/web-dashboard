import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginResponse} from '../dto/LoginResponse';
import {map} from 'rxjs/operators';
import {RouteDTO} from '../dto/RouteDTO';
import {VehicleDTO} from '../dto/VehicleDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static BASE_ENDPOINT = 'http://localhost:8080/api/city';
  private static LOGIN_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/users/login';
  private static GET_ROUTES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/routes';
  private static GET_VEHICLES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const loginObj = { username, password};
    return this.http.post<LoginResponse>(ApiService.LOGIN_API_ENDPOINT, loginObj);
  }

  routes(): Observable<Array<RouteDTO>> {
    return this.http.get<Array<RouteDTO>>(ApiService.GET_ROUTES_API_ENDPOINT);
  }

  vehicles(): Observable<Array<VehicleDTO>> {
    return this.http.get<Array<VehicleDTO>>(ApiService.GET_VEHICLES_API_ENDPOINT);
  }
}
