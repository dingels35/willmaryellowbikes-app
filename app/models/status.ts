
export class Status {
  id: number;
  type: string;
  bike_id: number;
  bike_rack_id: number;
  latitude: number;
  longitude: number;
  location_description: string;
  broken_description: string;
  resolved: boolean;
  created_at: string;
  updated_at: string;
  bike_count: number;

  constructor(params?) {
    this.id = params.id;
    this.type = params.type;
    this.bike_id = params.bike_id;
    this.bike_rack_id = params.bike_rack_id;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.location_description = params.location_description;
    this.broken_description = params.broken_description;
    this.resolved = params.resolved;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.bike_count = params.bike_count;
  }

}

