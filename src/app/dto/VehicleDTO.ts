import {StationDTO} from './StationDTO';

export class VehicleDTO {
  id: string;
  licensePlate: string;
  waitingTimeTarget: number;
  occupancyTarget: number;
  inertialTimeTarget: number;
  totalAvailableSeats: number;
  occupiedSeats: number;
  creationDate: any;

  moving: boolean;
  initialWaitingDate: any;
  currentStation: StationDTO;
  routeId: string;
  route: Array<any>;
  pickPoint: Array<any>;
}
