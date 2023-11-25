import { Cart } from "./Cart";
import { CreditCard } from "./CreditCard";
import { UserLocation } from "./UserLocation";

export interface User {
  Id: number;
  FirstName: string;
  LastName: string;
  Username: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  Locations: UserLocation[];
  CreditCards: CreditCard[];
  CartItems: Cart[];
  CurrentLocation: UserLocation | null;
}