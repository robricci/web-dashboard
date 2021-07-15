import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouteDTO} from '../dto/RouteDTO';
import {VehicleDTO} from '../dto/VehicleDTO';
import {SessionResponse} from '../dto/SessionResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static BASE_ENDPOINT = 'http://localhost:8080/api/city';
  private static LOGIN_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/users/login';
  private static VALIDATE_SESSION_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/users/validate-session';
  private static GET_ROUTES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/routes';
  private static GET_VEHICLES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles';
  private static INSERT_VEHICLES_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles';
  private static VEHICLE_PARAMS_CONFIGURATION_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles/{}/configuration';
  private static REMOVE_VEHICLE_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles/{}';
  private static MANUAL_DISPLACEMENT_API_ENDPOINT = ApiService.BASE_ENDPOINT + '/vehicles/{}/displacement';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<SessionResponse> {
    const body = { username, password};
    return this.http.post<SessionResponse>(ApiService.LOGIN_API_ENDPOINT, body);
  }

  validateSession(jwt: string): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(ApiService.VALIDATE_SESSION_API_ENDPOINT, jwt);
  }

  routes(): Observable<Array<RouteDTO>> {
    return this.http.get<Array<RouteDTO>>(ApiService.GET_ROUTES_API_ENDPOINT);
  }

  vehicles(): Observable<Array<VehicleDTO>> {
    return this.http.get<Array<VehicleDTO>>(ApiService.GET_VEHICLES_API_ENDPOINT);
  }

  saveParamsConfiguration(licensePlate: string, occupancyTarget: number,
                          inertialTimeTarget: number, waitingTimeTarget: number): Observable<any> {
    const endpoint = ApiService.VEHICLE_PARAMS_CONFIGURATION_API_ENDPOINT.replace('{}', licensePlate);
    const body = {occupancyTarget, inertialTimeTarget, waitingTimeTarget};
    return this.http.post<any>(endpoint, body);
  }

  insertVehicles(vehicles: Array<any>): Observable<any> {
    return this.http.post<any>(ApiService.INSERT_VEHICLES_API_ENDPOINT, vehicles);
  }

  removeVehicle(licensePlate: string): Observable<any> {
    const endpoint = ApiService.REMOVE_VEHICLE_API_ENDPOINT.replace('{}', licensePlate);
    return this.http.delete<any>(endpoint);
  }

  manualDisplacement(licensePlate: string, body: any): Observable<any> {
    const endpoint = ApiService.MANUAL_DISPLACEMENT_API_ENDPOINT.replace('{}', licensePlate);
    return this.http.post<any>(endpoint, body);
  }
}
