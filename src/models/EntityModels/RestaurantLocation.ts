export interface RestaurantLocation {
  id: number;
  province: string;
  district: string;
  neighbourhood: string;
  street: string;
  buildingNo: string;
  apartmentNo?: string | null;
  addition?: string | null;
}