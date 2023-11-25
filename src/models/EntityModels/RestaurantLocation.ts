export interface RestaurantLocation {
  Id: number;
  Province: string;
  District: string;
  Neighbourhood: string;
  Street: string;
  BuildingNo: string;
  ApartmentNo?: string | null;
  Addition?: string | null;
}