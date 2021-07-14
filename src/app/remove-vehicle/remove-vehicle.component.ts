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
      size: 'sm',
      ariaLabelledBy: 'modal-basic-title'
    };
    this.modalReference = this.modalService.open(content, ngbModalOptions);
  }

  close() {
    this.modalReference.close();
  }

  save(licensePlate: string) {
    this.apiService.removeVehicle(licensePlate)
      .subscribe(res => {
          this.saved.emit();
          this.close();
        },
        error => {
          console.log(error);
        });
  }
}
