export type CartItemType = {
    currentUserID: number,
    data: {
        restaurantID: number,
        name: string,
        itemID: number,
        itemName: string,
        imageSource: string,
        price: number,
        amount: number
    }
}

export type CartType = {
    restaurantID: number,
    name: string,
    itemID: number,
    itemName: string,
    imageSource: string,
    price: number,
    amount: number
}