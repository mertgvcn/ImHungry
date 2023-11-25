import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Restaurant } from "./Restaurant";

export interface Item {
  Id: number;
  Name: string;
  Description?: string | null;
  ImageSource?: string | null;
  Price: number;
  Restaurant: Restaurant;
  Category: Category;
  Ingredients?: Ingredient[] | null;
}