import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../services/api.service';
import {RouteDTO} from '../dto/RouteDTO';
import {VehicleDTO} from '../dto/VehicleDTO';
import {StationDTO} from '../dto/StationDTO';

@Component({
  selector: 'app-manual-displacement',
  templateUrl: './manual-displacement.component.html',
  styleUrls: ['./manual-displacement.component.less']
})
export class ManualDisplacementComponent implements OnInit {

  @Input() openView: Subject<any>;
  @Input() routes: Array<RouteDTO>;
  @Input() vehicle: VehicleDTO;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') modal: ElementRef;
  private modalReference: NgbModalRef;

  faSpinner = faSpinner;

  private routeStationsMap: Map<string, Array<StationDTO>> = new Map<string, Array<StationDTO>>();
  stations: Array<StationDTO> = new Array<StationDTO>();

  enableSaveButton: boolean = true;

  constructor(private modalService: NgbModal,
              private apiService: ApiService) {}

  ngOnInit(): void {
    this.openView.subscribe(event => {
      this.open(this.modal);
    });
  }

  changeStationsOption(routeId: string) {
    this.stations = this.routeStationsMap.get(routeId);
  }

  private init() {
    this.enableSaveButton = true;
    this.routes.forEach((r: RouteDTO) => {
      this.routeStationsMap.set(r.id, r.stations);
      if (r.id === this.vehicle.routeId) {
        this.stations = r.stations;
      }
    });
  }

  open(content) {
    this.init();

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
    this.routeStationsMap.clear();
    this.stations = new Array<StationDTO>();
  }

  save(licensePlate: string, routeId: number, stationId: number, event: Event) {
    event.preventDefault();
    this.enableSaveButton = false;
    if (licensePlate && routeId && stationId) {
      const body = {
        routeId,
        station: {
          nodeId: stationId
        }
      };
      this.apiService.manualDisplacement(licensePlate, body)
        .subscribe(res => {
            this.saved.emit();
            this.close();
          },
          error => {
            alert('Ops.. something went wrong, try again later');
          });
    }
  }
}
