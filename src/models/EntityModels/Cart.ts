import { Item } from "./Item";
import { Restaurant } from "./Restaurant";

export interface Cart {
  id: number;
  ingredientList?: string | null;
  amount: number;
  restaurant: Restaurant;
  item: Item;
}