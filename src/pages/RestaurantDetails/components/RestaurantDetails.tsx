import React, { useEffect, useState } from 'react'
//EXPORTED FUNCTIONS
import { getRestaurantDetail } from '../../../setup/API/restaurant_api'
import { RestaurantDetail } from '../../../types/RestaurantType'

type propsType = {
    restaurantID: number
}

const RestaurantDetails = (props: propsType) => {
    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetail>()

    const fetchRestaurantDetails = async () => {
        const data = await getRestaurantDetail(props.restaurantID)
        setRestaurantDetails(data[0])
    }

    useEffect(() => {
        fetchRestaurantDetails()
    }, [])


    return (
        <>
            <div>RestaurantDetails</div>
            <div>
                {restaurantDetails?.description}
            </div>
        </>
    )
}

export default RestaurantDetails