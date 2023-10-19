export type CartItemType = {
    data: {
        restaurantID: number,
        name: string,
        itemID: number,
        itemName: string,
        imageSource: string,
        price: number,
        amount: number,
        ingredients: string
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
    ingredients: string
}
