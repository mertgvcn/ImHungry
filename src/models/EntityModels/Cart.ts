import { Item } from "./Item";
import { Restaurant } from "./Restaurant";

export interface Cart {
  Id: number;
  IngredientList?: string | null;
  Amount: number;
  Restaurant: Restaurant;
  Item: Item;
}