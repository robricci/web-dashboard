import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {VehicleDTO} from '../dto/VehicleDTO';
import {Subject} from 'rxjs';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-insert-vehicle',
  templateUrl: './insert-vehicle.component.html',
  styleUrls: ['./insert-vehicle.component.less']
})
export class InsertVehicleComponent implements OnInit {

  @Input() openView: Subject<any>;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') modal: ElementRef;
  private modalReference: NgbModalRef;

  constructor(private modalService: NgbModal,
              private apiService: ApiService) {}

  ngOnInit(): void {
    this.openView.subscribe(event => {
      this.open(this.modal);
    });
  }

  open(content) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      size: 'md',
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalReference = this.modalService.open(content, ngbModalOptions);
  }

  close() {
    this.modalReference.close();
  }

  save(licensePlate: string, totalSeats: number, occupancyTarget: number,
       inertialTimeTarget: number, waitingTimeTarget: number, event: Event) {
    event.preventDefault();
    const vehicles = [
      {
        licensePlate,
        totalAvailableSeats: totalSeats,
        waitingTimeTarget,
        occupancyTarget,
        inertialTimeTarget
      }
    ];
    this.apiService.insertVehicles(vehicles)
      .subscribe(res => {
          this.saved.emit();
          this.close();
        },
        error => {
          console.log(error);
        });
  }
}
