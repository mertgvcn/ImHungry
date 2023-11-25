export interface CartTransactionRequest {
  ItemID: number;
  RestaurantID: number;
  Ingredients?: string | null;
  Amount?: number | null;
}