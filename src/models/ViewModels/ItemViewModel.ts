import { Category } from "../EntityModels/Category";

export interface ItemViewModel {
  Id: number;
  Name: string;
  Description?: string | null;
  ImageSource?: string | null;
  Price: number;
  Category: Category;
}