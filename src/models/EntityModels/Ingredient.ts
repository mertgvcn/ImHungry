import { Item } from "./Item";

export interface Ingredient {
  id: number;
  name: string;
  items: Item[];
}