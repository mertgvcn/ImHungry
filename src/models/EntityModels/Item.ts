import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Restaurant } from "./Restaurant";

export interface Item {
  id: number;
  name: string;
  description?: string | null;
  imageSource?: string | null;
  price: number;
  restaurant: Restaurant;
  category: Category;
  ingredients?: Ingredient[] | null;
}