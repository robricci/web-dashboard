import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {VehicleDTO} from '../dto/VehicleDTO';
import {Subject} from 'rxjs';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-remove-vehicle',
  templateUrl: './remove-vehicle.component.html',
  styleUrls: ['./remove-vehicle.component.less']
})
export class RemoveVehicleComponent implements OnInit {

  @Input() vehicle: VehicleDTO;
  @Input() openView: Subject<any>;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') modal: ElementRef;
  private modalReference: NgbModalRef;

  enableSaveButton: boolean = true;
  msg: string;

  constructor(private modalService: NgbModal,
              private apiService: ApiService) {}

  ngOnInit(): void {
    this.openView.subscribe(event => {
      this.open(this.modal);
      this.msg = undefined;
      this.enableSaveButton = true;
    });
  }

  open(content) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalReference = this.modalService.open(content, ngbModalOptions);
  }

  close() {
    this.modalReference.close();
  }

  save(licensePlate: string, event: Event) {
    event.preventDefault();
    this.apiService.removeVehicle(licensePlate)
      .subscribe(res => {
          if (res) {
            this.saved.emit();
            this.close();
          } else {
            this.enableSaveButton = false;
            this.msg = 'The vehicle is currently in motion, please try again when the vehicle is stationary.';
          }
        },
        response => {
          if (response.status === 400) {
            this.msg = 'Please try again later';
          } else if (response.status === 401) {
            this.msg = 'Invalid credentials';
          } else {
            this.msg = 'Generic error';
          }
        });
  }
}
