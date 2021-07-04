export class TripRequest {
  osmidSource: number;
  osmidDestination: number;

  constructor(sourceId, destId) {
    this.osmidSource = sourceId;
    this.osmidDestination = destId;
  }
}
