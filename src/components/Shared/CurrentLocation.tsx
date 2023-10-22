import { useContext, useState } from 'react'
import { ChangeContext } from '../../context/ChangeContext'
//exported functions
import { DeleteLocationByLocationID, GetUserLocationList } from '../../setup/API/location_api'
import { GetCurrentLocation, SetCurrentLocation } from '../../setup/API/user_api'
//css
import './styles/CurrentLocation.css'
//types
import { CurrentLocationType } from '../../types/UserDataType'
import { UserLocationsType } from '../../types/LocationDataType'
//components
import LocationAdd from '../../pages/Profile/components/Location/LocationAdd'


type currentLocationType = {
    width: string,
    currentLocation: CurrentLocationType | null,
}


const CurrentLocation = (props: currentLocationType) => {
    //Context
    const { locationToggle, setLocationToggle, restaurantToggle, setRestaurantToggle } = useContext(ChangeContext)

    //Constants
    const initialLocationString = props.currentLocation ? getLocString(props.currentLocation) : ""

    //States
    const [displayedLocation, setDisplayedLocation] = useState<string>(initialLocationString)
    const [userLocations, setUserLocations] = useState<UserLocationsType[]>([])
    const [dropDownState, setDropDownState] = useState<boolean>(false)
    const [addLocState, setAddLocState] = useState<boolean>(false)


    //fetch other locations
    const fetchLocationsOfUser = async (): Promise<void> => {
        const data: any = await GetUserLocationList()
        setUserLocations(data)

        return new Promise((resolve) => { resolve() })
    }

    const handleFetchOtherLocations = async (needUpdate: boolean) => {
        if (!dropDownState) { //dropdown açıldığında fetchleyecek, state geriden geldiği için false durumunu aldık
            await fetchLocationsOfUser()
        }
        else if (needUpdate) { //delete durumunda live update yapmak için kullandık
            await fetchLocationsOfUser()
            setDropDownState(true)
        }
    }


    return (
        <div className='current-location-wrapper' style={{ width: props.width + "%" }}>
            <div className="current-location-title-wrapper">
                <p id="location-title">Location</p>
            </div>

            <div className="current-location-selection" onClick={() => {
                setDropDownState(!dropDownState);
                handleFetchOtherLocations(false);
            }}>
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
                                await SetCurrentLocation(location.locationID);
                                setDisplayedLocation(getLocString(location))
                                setLocationToggle(!locationToggle);
                                setRestaurantToggle(!restaurantToggle); //if current location changes, we need to update restaurant list
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
                                await DeleteLocationByLocationID(location.locationID);
                                if(await GetCurrentLocation() == null) {
                                    setDisplayedLocation("")
                                    setRestaurantToggle(!restaurantToggle)
                                }
                                setDropDownState(!dropDownState)
                                handleFetchOtherLocations(true)
                            }}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>

                        </li>
                    ))}

                </ul>

                {/* add new location */}
                <div className='add-new-location' onClick={() => {
                    setAddLocState(true);
                    setDropDownState(false)
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


//Helper
function getLocString(loc: CurrentLocationType) {
    return `${loc.locationTitle}, ${loc.province}/${loc.district}, ${loc.neighbourhood} - ${loc.street} ${loc.buildingNo}-${loc.buildingAddition} ${loc.apartmentNo} ${loc.note}`
}