import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../services/api.service';
import {VehicleDTO} from '../dto/VehicleDTO';
import {Subject} from 'rxjs';
import {RouteDTO} from '../dto/RouteDTO';
import {StationDTO} from '../dto/StationDTO';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.less']
})
export class ConfigurationComponent implements OnInit {

  @Input() vehicle: VehicleDTO;
  @Input() openView: Subject<any>;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') modal: ElementRef;
  private modalReference: NgbModalRef;
  saveButtonDisabled: boolean = true;

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

  enableSaveButton() {
    this.saveButtonDisabled = false;
  }

  close() {
    this.modalReference.close();
  }

  save(licensePlate: string, occupancyTarget: number, inertialTimeTarget: number, waitingTimeTarget: number) {
    this.apiService.saveParamsConfiguration(licensePlate, occupancyTarget, inertialTimeTarget, waitingTimeTarget)
      .subscribe(res => {
          this.saved.emit();
          this.close();
        },
        error => {
          console.log(error);
        });
  }
}
