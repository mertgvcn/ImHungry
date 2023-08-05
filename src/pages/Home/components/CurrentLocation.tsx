import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
//exported functions
import { getLocationsByUserID } from '../../../setup/API/location_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
//type
import { LocationType } from '../../../types/LocationType'
//css
import '../styles/CurrentLocation.css'

const CurrentLocation = () => {
    //Context
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Locations
    const [userLocations, setUserLocations] = useState<Array<LocationType>>([])
    const [currentLocation, setCurrentLocation] = useState("")
    const [locationsState, setLocationsState] = useState<boolean>(false)


    const fetchLocations = async () => {
        const data = await getLocationsByUserID(_currentUserID)
        setUserLocations(data)
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return (
        <div className='current-location-wrapper'>
            <div className="current-location-title-wrapper">
                <p id="location-title">CURRENT LOCATION</p>
            </div>

            <div className="current-location-selection" onClick={() => setLocationsState(!locationsState)}>
                <input id="current-location" type="text" placeholder='Select Current Location' 
                value={currentLocation} readOnly={true}/>
                <i className="fa-solid fa-chevron-down"></i>
            </div>

            {locationsState && (<div className='locations'>
                <ul>
                    {userLocations.map((location, idx) => (
                        <li key={idx} onClick={(e) => {setCurrentLocation(e.currentTarget.innerText); setLocationsState(false)}}>
                            <i className="fa-solid fa-location-dot" style={{ marginRight: 2, fontSize: 16 }}></i>
                            {location.province}/{location.district}
                            , {location.neighbourhood.length > 12 ? 
                                `${location.neighbourhood.substring(0,12)}...` : location.neighbourhood
                              }
                            , {location.address.length > 12 ?
                                `${location.address.substring(0,12)}...` : location.address
                            }
                        </li>
                    ))}
                </ul>
            </div>)}
        </div>
    )
}

export default CurrentLocation