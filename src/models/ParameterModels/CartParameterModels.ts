export interface CartTransactionRequest {
  CartItemID : number,
  ItemID: number;
  RestaurantID: number;
  Ingredients?: string | null;
  Amount?: number | null;
}