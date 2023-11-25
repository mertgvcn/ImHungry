import { RestaurantLocation } from "../EntityModels/RestaurantLocation";

export interface RestaurantListViewModel {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Email: string;
  Description?: string | null;
  ImageSource?: string | null;
  Location: RestaurantLocation;
}