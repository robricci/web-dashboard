import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {RouteDTO} from '../dto/RouteDTO';
import {StationDTO} from '../dto/StationDTO';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import {VehicleDTO} from '../dto/VehicleDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  infoVehicle: VehicleDTO;

  stationsMarkers: Array<any> = [];
  vehiclesMarkers: Array<any> = [];
  center = {
    lat: 45.757430,
    lng: 4.840735
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  onLoggedIn(event: any): void {
    this.apiService.routes().subscribe(routes => {
        const stations = [];
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
          lat: sta.latitude,
          lng: sta.longitude,
        },
        /*label: {
          color: 'red',
          text: 'Marker label ' + (this.markers.length + 1),
        },*/
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
      this.vehiclesMarkers.push({
        position: {
          lat: vehicle.currentStation.position.latitude + 0.0005,
          lng: vehicle.currentStation.position.longitude + 0.0005,
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

  openManualDisplacementView(infoVehicle: VehicleDTO) {

  }

  openChangeConfigParamsView(infoVehicle: VehicleDTO) {

  }

  openRemoveVehicleView(infoVehicle: VehicleDTO) {

  }
}
