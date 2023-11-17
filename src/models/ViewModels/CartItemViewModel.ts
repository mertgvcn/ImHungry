interface CartItemViewModel {
    id: number;
    ingredientList?: string | null;
    amount: number;
    restaurant: CartItem_RestaurantViewModel;
    item: CartItem_ItemViewModel;
  }
  
  interface CartItem_RestaurantViewModel {
    id: number;
    name: string;
  }
  
  interface CartItem_ItemViewModel {
    id: number;
    name: string;
    imageSource?: string | null;
    price: number;
  }