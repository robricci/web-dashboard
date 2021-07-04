import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services/backend.service';
import {TripRequest} from '../dto/TripRequest';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {TripConfirm} from '../dto/TripConfirm';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.less']
})
export class WebsocketComponent implements OnInit {

  connectBtnDisabled: boolean = true;
  sendTripBtnDisabled: boolean = true;
  ticket: string;
  wsStatus: string;
  tripRequests: Array<any> = [];
  confirmedTrips: Array<any> = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }

  getTicket(jwt: string): void {
    if (jwt !== '') {
      this.backendService.generateTicket(jwt)
        .subscribe(
          ticket => {
            this.ticket = ticket.oneTimeTicket;
            this.connectBtnDisabled = false;
          },
          error => {
            this.ticket = 'Error get new ticket';
            if (error instanceof HttpErrorResponse) {
              this.ticket += ': ' +  error.status + ' ' + error.statusText;
            }
          });
    }
  }

  connect(): void {
    this.backendService.connect(this.ticket)
      .subscribe(
        dataFromServer => {
          if (dataFromServer !== undefined && dataFromServer.status) {
            this.tripRequests[this.tripRequests.length - 1].status = dataFromServer.status;
          } else if (dataFromServer !== undefined && dataFromServer.tripId) {
            this.confirmedTrips.push(dataFromServer);
          } else if (dataFromServer === -1) { // Error on connect
            this.reset();
          }
        }, () => {}, () => {
          this.reset();
        });

    this.sendTripBtnDisabled = false;
    this.wsStatus = 'Connected';
  }

  send(source: number, destination: number): void {
    const tripReq = new TripRequest(source, destination);
    this.tripRequests.push(tripReq);
    this.backendService.send(tripReq);
  }

  private reset(): void {
    this.wsStatus = 'Disconnected';
    this.sendTripBtnDisabled = true;
    this.connectBtnDisabled = true;
    this.ticket = '';
  }

}
