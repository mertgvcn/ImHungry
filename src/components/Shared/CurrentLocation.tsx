import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ChangeContext } from '../../context/ChangeContext'
//exported functions
import { deleteLocationByID, getLocationsByUserID } from '../../setup/API/location_api'
import { Decrypt } from '../../setup/Crypto/Cryption'
import { getCurrentLocation, setCurrentLocation } from '../../setup/API/user_api'
//type
import { LocationType } from '../../types/LocationType'
//css
import './styles/CurrentLocation.css'
//components
import LocationAdd from '../../pages/Profile/components/Location/LocationAdd'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_APIKEY

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
    const [displayedLocation, setDisplayedLocation] = useState<string>("")
    const [dropDownState, setDropDownState] = useState<boolean>(false)
    const [addLocState, setAddLocState] = useState<boolean>(false)

    // const fetchLocations = async (): Promise<void> => {
    //     const data: any = await getLocationsByUserID(_currentUserID)
    //     setUserLocations(data)

    //     return new Promise((resolve) => { resolve() })
    // }

    // const fetchCurrentLocation = async (): Promise<void> => {
    //     const data: any = await getCurrentLocation(_currentUserID)

    //     if (data.length == 0) {
    //         setDisplayedLocation("")
    //         return;
    //     }

    //     const { locationTitle, province, district, neighbourhood, street, buildingNo, apartmentNo, addition } = data[0]
    //     setDisplayedLocation(`${locationTitle}, ${province}/${district}, ${neighbourhood} - ${street} ${buildingNo} ${apartmentNo} ${addition}`)

    //     return new Promise((resolve) => { resolve() })
    // }

    // const syncLocation = async () => {    
    //     await fetchLocations()
    //     await fetchCurrentLocation()
    // }

    useEffect(() => {

        // syncLocation()

        const cancelToken = axios.CancelToken.source()
        const cancelToken2 = axios.CancelToken.source()

        const fetchLocationsOfUser = async () => {
            console.log("Current Location 65 : fetchLocationsOfUser çalışıyor...")
            await axios.get('https://localhost:7181/api/Location/getLocationsByUserID', {
                cancelToken: cancelToken.token,
                params: {
                    userID: _currentUserID,
                },
                headers: {
                    'x-api-key': API_KEY
                }
            })
                .then((res) => {
                    setUserLocations(res.data)
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("CurrentLocation 85 : " + err.message)
                    }
                })
        }

        const fetchCurrentLocation = async () => {
            console.log("Current Location 86: fetchCurrentLocation çalışıyor...")
            await axios.get('https://localhost:7181/api/User/getCurrentLocation', {
                cancelToken: cancelToken2.token,
                params: {
                    userID: _currentUserID,
                },
                headers: {
                    'x-api-key': API_KEY
                }
            })
                .then((res) => {
                    if (res.data.length == 0) {
                        setDisplayedLocation("")
                        return;
                    }

                    const { locationTitle, province, district, neighbourhood, street, buildingNo, apartmentNo, addition } = res.data[0]
                    setDisplayedLocation(`${locationTitle}, ${province}/${district}, ${neighbourhood} - ${street} ${buildingNo} ${apartmentNo} ${addition}`)
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log("CurrentLocation 105 : " + err.message)
                    }
                })
        }

        const syncFetch = async () => {
            await fetchLocationsOfUser()
            await fetchCurrentLocation()
        }

        syncFetch()

        return () => {
            cancelToken.cancel()
            cancelToken2.cancel()
        }

    }, [])



    useEffect(() => {
        // syncLocation()
    }, [toggle])


    return (
        <div className='current-location-wrapper' style={{ width: props.width + "%" }}>
            <div className="current-location-title-wrapper">
                <p id="location-title">Location</p>
            </div>

            <div className="current-location-selection" onClick={() => setDropDownState(!dropDownState)}>
                <input id="current-location" type="text" placeholder='Select Current Location'
                    value={displayedLocation} readOnly={true} />
                <i className="fa-solid fa-chevron-down"></i>
            </div>

            {dropDownState && (<div className='locations'>
                <ul>
                    {userLocations.map((location, idx) => (
                        <li key={idx}>

                            {/* Loc Info */}
                            <div className='location-info' onClick={async () => {
                                await setCurrentLocation(_currentUserID, location.locationID);
                                setToggle(!toggle);
                                setDropDownState(false);
                            }}>
                                <i className="fa-solid fa-location-dot" style={{ marginLeft: 1, marginRight: 5, fontSize: 16 }}></i>
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
                                        `, ${location.buildingNo.substring(0, 5)}...` : `, ${location.buildingNo}`
                                    : null
                                }
                                {location.buildingAddition ?
                                    location.buildingAddition.length > 5 ?
                                        `, ${location.buildingAddition.substring(0, 5)}...` : `, ${location.buildingAddition}`
                                    : null
                                }
                                {location.apartmentNo ?
                                    location.apartmentNo.length > 5 ?
                                        `, ${location.apartmentNo.substring(0, 5)}...` : `, ${location.apartmentNo}`
                                    : null
                                }
                                {location.note ?
                                    location.note.length > 15 ?
                                        `, ${location.note.substring(0, 15)}...` : `, ${location.note}`
                                    : null
                                }
                            </div>

                            {/* Delete Loc */}
                            <div className='location-delete' onClick={async () => {
                                await deleteLocationByID(location.locationID);
                                setToggle(!toggle);
                                setDropDownState(true);
                            }}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>

                        </li>
                    ))}

                </ul>

                {/* add new location */}
                <div className='add-new-location' onClick={() => {
                    setAddLocState(true);
                    setToggle(!toggle);
                }}>
                    <i className="fa-regular fa-square-plus" style={{ marginRight: 5 }}></i>
                    <p>Add new location..</p>
                </div>
            </div>)}

            <LocationAdd trigger={addLocState} setTrigger={setAddLocState} />
        </div>
    )
}

export default CurrentLocation