import { Item } from "./Item";

export interface Ingredient {
  Id: number;
  Name: string;
  Items: Item[];
}