import { Item } from "./Item";
import { RestaurantLocation } from "./RestaurantLocation";

export interface Restaurant {
  Id: number;
  Name: string;
  PhoneNumber: string;
  Email: string;
  Description?: string | null;
  ImageSource?: string | null;
  Items: Item[];
  Location: RestaurantLocation;
}