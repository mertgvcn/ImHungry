export interface RestaurantSummaryViewModel {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  description?: string | null;
  imageSource?: string | null;
}