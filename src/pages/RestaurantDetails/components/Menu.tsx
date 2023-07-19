import React, { useEffect, useState } from 'react'
import { getRestaurantMenu } from '../../../setup/API/restaurant_api'
import { MenuType } from '../../../types/RestaurantType'

type propsType = {
    restaurantID: number
}

const Menu = (props: propsType) => {
    const [restaurantMenu, setRestaurantMenu] = useState<Array<MenuType>>()

    const fetchRestaurantMenu = async () => {
        const data = await getRestaurantMenu(props.restaurantID)
        setRestaurantMenu(data) //array dönüyor
    }

    useEffect(() => {
        fetchRestaurantMenu()
    }, [])

    return (
        <div>
            <ul>
                {restaurantMenu?.map((menuItem, key) => (
                    <li key={key}>{menuItem.itemName}</li>
                ))}
            </ul>
        </div>
    )
}

export default Menu