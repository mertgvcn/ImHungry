interface Cart {
    id: number;
    ingredientList?: string | null;
    amount: number;
    restaurant: Restaurant;
    item: Item;
  }