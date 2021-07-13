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
  currentStation: any;
  route: Array<any>;
  pickPoint: Array<any>;
}
