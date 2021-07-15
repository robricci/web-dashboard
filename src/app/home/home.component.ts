import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { faPlus, faPlay, faArrowsAlt, faCogs, faTrash } from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../services/api.service';
import {RouteDTO} from '../dto/RouteDTO';
import {StationDTO} from '../dto/StationDTO';

import {VehicleDTO} from '../dto/VehicleDTO';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  faPlus = faPlus;
  faPlay = faPlay;
  faCogs = faCogs;
  faArrowsAlt = faArrowsAlt;
  faTrash = faTrash;

  mapOptions = {
    zoom: 11,
    center: {
      lat: 45.757430,
      lng: 4.840735
    },
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  };

  paramsConfigurationView: Subject<any> = new Subject();
  manualDisplacementView: Subject<any> = new Subject();
  removeVehicleView: Subject<any> = new Subject();
  insertVehicleView: Subject<any> = new Subject();

  infoVehicle: VehicleDTO;
  routes: Array<RouteDTO>;
  showPrivateActions: boolean = false;

  stationsMarkers: Array<any> = [];
  vehiclesMarkers: Array<any> = [];
  center = {
    lat: 45.757430,
    lng: 4.840735
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  onLoggedIn(event: any): void {
    this.apiService.routes().subscribe(routes => {
        this.showPrivateActions = true;
        const stations = [];
        this.routes = routes;
        routes.forEach((route: RouteDTO) => {
          route.stations.forEach((sta: StationDTO) => {
            if (!stations.find(item => item.nodeId === sta.nodeId)) {
              stations.push(sta);
            }
          });
        });
        this.drawStations(stations);
      },
      error => {
        console.log(error);
      });

    this.refreshVehicles();
  }

  refreshVehicles() {
    this.vehiclesMarkers = [];
    this.apiService.vehicles().subscribe(vehicles => {
        this.drawVehicles(vehicles);
      },
      error => {
        console.log(error);
      });
  }

  drawStations(stations: Array<StationDTO>): void {
    stations.forEach(sta => {
      this.stationsMarkers.push({
        position: {
          lat: sta.position.latitude,
          lng: sta.position.longitude,
        },
        title: `Station ${sta.nodeId}`,
        options: {
          animation: google.maps.Animation.DROP,
          icon: '/assets/icons/station.png'
        },
        info: 'Ehiiiii'
      });
    });
  }

  drawVehicles(vehicles: Array<VehicleDTO>): void {
    vehicles.forEach((vehicle: VehicleDTO) => {
      const randomLat = parseFloat(((Math.random() * 2 - 1) * 0.001).toFixed(5));
      const randomLng = parseFloat(((Math.random() * 2 - 1) * 0.001).toFixed(5));
      this.vehiclesMarkers.push({
        position: {
          lat: vehicle.currentStation.position.latitude + randomLat,
          lng: vehicle.currentStation.position.longitude + randomLng,
        },
        title: `Vehicle ${vehicle.licensePlate}`,
        options: {
          animation: vehicle.moving ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP,
          icon: '/assets/icons/car.png'
        },
        info: vehicle
      });
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoVehicle = content;
    this.infoWindow.open(marker);
  }

  openManualDisplacementView() {
    this.manualDisplacementView.next('open');
  }

  openParamsConfigurationView() {
    this.paramsConfigurationView.next('open');
  }

  openRemoveVehicleView() {
    this.removeVehicleView.next('open');
  }

  openInsertVehicleView() {
    this.insertVehicleView.next('open');
  }
}
