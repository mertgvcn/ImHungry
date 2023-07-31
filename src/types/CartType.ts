export type CartItemType = {
    currentUserID: number,
    data: {
        itemID: number,
        restaurantID: number,
        itemName: string,
        imageSource: string,
        price: number,
        amount: number
    }
}

export type CartType = {
    itemID: number,
    restaurantID: number,
    itemName: string,
    imageSource: string,
    price: number,
    amount: number
}