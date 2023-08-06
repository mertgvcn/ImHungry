import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { getLocationsByUserID } from '../../../setup/API/location_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
import { getCurrentLocation, setCurrentLocation } from '../../../setup/API/user_api'
//type
import { LocationType } from '../../../types/LocationType'
//css
import '../styles/CurrentLocation.css'


type propType = {
    width: string
}


const CurrentLocation = (props: propType) => {
    //Context
    const { toggle, setToggle } = useContext(ChangeContext) 
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

    const fetchCurrentLocation = async () => {
        const data = await getCurrentLocation(_currentUserID)
        const {locationTitle, province, district, neighbourhood, street, buildingNo, apartmentNo, addition} = data[0]
        setLocation(`${locationTitle}, ${province}/${district}, ${neighbourhood} - ${street} ${buildingNo} ${apartmentNo} ${addition}`)
    }

    useEffect(() => {
        fetchCurrentLocation()
    },[toggle])

    return (
        <div className='current-location-wrapper' style={{width: props.width+"%"}}>
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
                        <li key={idx} onClick={async () => {
                            await setCurrentLocation(_currentUserID, location.locationID);
                            setToggle(!toggle);
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