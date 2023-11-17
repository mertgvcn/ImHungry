interface CartTransactionRequest {
    itemId: number;
    restaurantId: number;
    ingredients?: string | null;
    amount?: number | null;
  }