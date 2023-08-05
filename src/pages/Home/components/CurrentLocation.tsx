import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
//exported functions
import { getLocationsByUserID } from '../../../setup/API/location_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
import { setCurrentLocation } from '../../../setup/API/user_api'
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
    const [location, setLocation] = useState<string>("")
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
                    value={location} readOnly={true} />
                <i className="fa-solid fa-chevron-down"></i>
            </div>

            {locationsState && (<div className='locations'>
                <ul>
                    {userLocations.map((location, idx) => (
                        <li key={idx} onClick={async (e) => {
                            await setCurrentLocation(_currentUserID, location.locationID);
                            setLocation(
                                `${location.locationTitle}, ${location.province}/${location.district}` +
                                `${location.neighbourhood.length > 12 ? `, ${location.neighbourhood.substring(0, 12)}...` : `, ${location.neighbourhood}`}` +
                                `${location.street ? (location.street.length > 12 ? `, ${location.street.substring(0, 12)}...` : `, ${location.street}`) : ""}` +
                                `${location.buildingNo ? (location.buildingNo.length > 5 ? `, ${location.buildingNo.substring(0, 5)}...` : `, ${location.buildingNo}`) : ""}` +
                                `${location.apartmentNo ? (location.apartmentNo.length > 5 ? `, ${location.apartmentNo.substring(0, 5)}...` : `, ${location.apartmentNo}`) : ""}` +
                                `${location.addition ? (location.addition.length > 15 ? `, ${location.addition.substring(0, 15)}...` : `, ${location.addition}`) : ""}`
                            );
                            setLocationsState(false);
                        }}>
                            <i className="fa-solid fa-location-dot" style={{ marginRight: 2, fontSize: 16 }}></i>
                            {location.locationTitle}
                            , {location.province}/{location.district}
                            {location.neighbourhood.length > 12 ?
                                `, ${location.neighbourhood.substring(0, 12)}...` : `, ${location.neighbourhood}`
                            }
                            {location.street ?
                                location.street.length > 12 ?
                                    `, ${location.street.substring(0, 12)}...` : `, ${location.street}`
                                : null
                            }
                            {location.buildingNo ?
                                location.buildingNo.length > 5 ?
                                    `, ${location.street.substring(0, 5)}...` : `, ${location.buildingNo}`
                                : null
                            }
                            {location.apartmentNo ?
                                location.apartmentNo.length > 5 ?
                                    `, ${location.apartmentNo.substring(0, 5)}...` : `, ${location.apartmentNo}`
                                : null
                            }
                            {location.addition ?
                                location.addition.length > 15 ?
                                    `, ${location.addition.substring(0, 15)}...` : `, ${location.addition}`
                                : null
                            }

                        </li>
                    ))}
                </ul>
            </div>)}
        </div>
    )
}

export default CurrentLocation