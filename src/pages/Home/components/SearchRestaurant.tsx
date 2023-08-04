import React, { useContext } from 'react'
import { RestaurantContext } from '../../../context/RestaurantContext'
//css
import '../styles/SearchRestaurant.css'

const SearchRestaurant = () => {
    const { filteredName, setFilteredName } = useContext(RestaurantContext)

    return (
        <div className='search-restaurant-wrapper'>
            <div className="search-restaurant-title-wrapper">
                <p id="search-title">SEARCH</p>
            </div>
            <div className="search-inputs">
                <div className="searchbar-wrapper">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search restaurants'
                        value={filteredName} onChange={(e) => setFilteredName(e.target.value)} />
                </div>

                <input id='search-button' type="button" value="SEARCH"/>
            </div>
        </div>
    )
}

export default SearchRestaurant