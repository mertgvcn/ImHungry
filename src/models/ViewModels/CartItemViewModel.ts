export interface CartItemViewModel {
  id: number;
  ingredientList?: string | null;
  amount: number;
  restaurant: CartItem_RestaurantViewModel;
  item: CartItem_ItemViewModel;
}

export interface CartItem_RestaurantViewModel {
  id: number;
  name: string;
}

export interface CartItem_ItemViewModel {
  id: number;
  name: string;
  imageSource?: string | null;
  price: number;
}