export type CartDataType = {
    cartItems: CartItemsType[],
    cartItemNumber: number
}

export type CartItemsType = {
    restaurantID: number,
    name: string,
    itemID: number,
    itemName: string,
    imageSource: string,
    price: number,
    amount: number
}