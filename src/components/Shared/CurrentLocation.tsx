import { useContext, useState } from 'react'
import { ChangeContext } from '../../context/ChangeContext'
//exported functions
import { DeleteLocationByLocationID, GetUserLocationList } from '../../setup/API/location_api'
import { GetCurrentLocation, SetCurrentLocation } from '../../setup/API/user_api'
//css
import './styles/CurrentLocation.css'
//models
import { LocationViewModel } from '../../models/ViewModels/LocationViewModel'
//components
import LocationAdd from '../../pages/User/Profile/components/Location/LocationAdd'
import { SetCurrentLocationRequest } from '../../models/ParameterModels/UserParameterModels'


type currentLocationType = {
    width: string,
    currentLocation: LocationViewModel | null,
}


const CurrentLocation = (props: currentLocationType) => {
    //Context
    const { locationToggle, setLocationToggle, restaurantToggle, setRestaurantToggle } = useContext(ChangeContext)

    //Constants
    const initialLocationString = props.currentLocation ? getLocString(props.currentLocation) : ""

    //States
    const [displayedLocation, setDisplayedLocation] = useState<string>(initialLocationString)
    const [userLocations, setUserLocations] = useState<LocationViewModel[]>([])
    const [dropDownState, setDropDownState] = useState<boolean>(false)
    const [addLocState, setAddLocState] = useState<boolean>(false)


    //fetch other locations
    const fetchLocationsOfUser = async (): Promise<void> => {
        const data: any = await GetUserLocationList()
        setUserLocations(data)

        return new Promise((resolve) => { resolve() })
    }

    
    //on click actions
    const handleFetchOtherLocations = async (needUpdate: boolean) => {
        if (!dropDownState) { //dropdown açıldığında fetchleyecek, state geriden geldiği için false durumunu aldık
            await fetchLocationsOfUser()
        }
        else if (needUpdate) { //delete durumunda live update yapmak için kullandık
            await fetchLocationsOfUser()
            setDropDownState(true)
        }
    }

    const handleChangeCurrentLocation = async (location: LocationViewModel) => {
        const setCurrentLocationRequest: SetCurrentLocationRequest = {
            LocationID: location.Id
        }     

        await SetCurrentLocation(setCurrentLocationRequest);
        setDisplayedLocation(getLocString(location))
        setLocationToggle(!locationToggle);
        setRestaurantToggle(!restaurantToggle); //if current location changes, we need to update restaurant list
        setDropDownState(false);
    }

    const handleDeleteLocation = async (location: LocationViewModel) => {
        await DeleteLocationByLocationID(location.Id);
        if(await GetCurrentLocation() == null) {
            setDisplayedLocation("")
            setRestaurantToggle(!restaurantToggle)
        }
        setDropDownState(!dropDownState)
        handleFetchOtherLocations(true)
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
                                handleChangeCurrentLocation(location)
                            }}>
                                <i className="fa-solid fa-location-dot" style={{ marginLeft: 1, marginRight: 5, fontSize: 16 }}></i>
                                {location.Title}
                                , {location.Province}/{location.District}
                                {location.Neighbourhood.length > 12 ?
                                    `, ${location.Neighbourhood.substring(0, 12)}...` : `, ${location.Neighbourhood}`
                                }
                                {location.Street ?
                                    location.Street.length > 12 ?
                                        `, ${location.Street.substring(0, 12)}...` : `, ${location.Street}`
                                    : null
                                }
                                {location.BuildingNo ?
                                    location.BuildingNo.length > 5 ?
                                        `, ${location.BuildingNo.substring(0, 5)}...` : `, ${location.BuildingNo}`
                                    : null
                                }
                                {location.BuildingAddition ?
                                    location.BuildingAddition.length > 5 ?
                                        `, ${location.BuildingAddition.substring(0, 5)}...` : `, ${location.BuildingAddition}`
                                    : null
                                }
                                {location.ApartmentNo ?
                                    location.ApartmentNo.length > 5 ?
                                        `, ${location.ApartmentNo.substring(0, 5)}...` : `, ${location.ApartmentNo}`
                                    : null
                                }
                                {location.Note ?
                                    location.Note.length > 15 ?
                                        `, ${location.Note.substring(0, 15)}...` : `, ${location.Note}`
                                    : null
                                }
                            </div>

                            {/* Delete Loc */}
                            <div className='location-delete' onClick={async () => {
                                handleDeleteLocation(location)
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
function getLocString(loc: LocationViewModel) {
    return `${loc.Title}, ${loc.Province}/${loc.District}, ${loc.Neighbourhood} - ${loc.Street} ${loc.BuildingNo}-${loc.BuildingAddition} ${loc.ApartmentNo} ${loc.Note}`
}