import React, { useContext, useRef, useState } from 'react'
import { RestaurantContext } from '../../../context/RestaurantContext'
//css
import '../styles/SearchRestaurant.css'

const SearchRestaurant = () => {
    //context
    const { setFilteredName } = useContext(RestaurantContext)

    //states
    const [timer, setTimer] = useState<any>(null)
    const searchInputRef = useRef("")

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        searchInputRef.current = e.target.value
        clearTimeout(timer) //her tuş girildiğinde timer'ı sıfırlıyoruz

        const newTimer = setTimeout(() => {
            setFilteredName(searchInputRef.current) //kullanıcı 300ms tuş girmediğinde restaurantContextteki filtered name'i setliyoruz
        }, 300)

        setTimer(newTimer)
    }

    return (
        <div className='search-restaurant-wrapper'>
            <div className="search-restaurant-title-wrapper">
                <p id="search-title">Search</p>
            </div>
            <div className="search-inputs">
                <div className="searchbar-wrapper">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search restaurants'
                        value={searchInputRef.current} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}

export default SearchRestaurant