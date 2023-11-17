export interface LocationViewModel {
  id: number;
  title: string;
  province: string;
  district: string;
  neighbourhood: string;
  street?: string | null;
  buildingNo?: string | null;
  buildingAddition?: string | null;
  apartmentNo?: string | null;
  note?: string | null;
}