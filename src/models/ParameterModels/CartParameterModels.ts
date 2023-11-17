export interface CartTransactionRequest {
  itemID: number;
  restaurantID: number;
  ingredients?: string | null;
  amount?: number | null;
}