export interface LocationViewModel {
  Id: number;
  Title: string;
  Province: string;
  District: string;
  Neighbourhood: string;
  Street?: string | null;
  BuildingNo?: string | null;
  BuildingAddition?: string | null;
  ApartmentNo?: string | null;
  Note?: string | null;
}