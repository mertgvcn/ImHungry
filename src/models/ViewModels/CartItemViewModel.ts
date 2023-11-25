export interface CartItemViewModel {
  Id: number;
  IngredientList?: string | null;
  Amount: number;
  Restaurant: CartItem_RestaurantViewModel;
  Item: CartItem_ItemViewModel;
}

export interface CartItem_RestaurantViewModel {
  Id: number;
  Name: string;
}

export interface CartItem_ItemViewModel {
  Id: number;
  Name: string;
  ImageSource?: string | null;
  Price: number;
}