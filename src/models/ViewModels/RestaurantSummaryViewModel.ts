export interface RestaurantSummaryViewModel {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Email: string;
  Description?: string | null;
  ImageSource?: string | null;
}