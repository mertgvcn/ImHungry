import { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { Decrypt } from '../../../../setup/Crypto/Cryption'
import { getLocationsByUserID } from '../../../../setup/API/location_api'
import useDidMountUpdate from '../../../../hooks/useDidMountUpdate'
//type
import { LocationDataType, UserLocationsType } from '../../../../types/LocationDataType'
//Css
import './styles/Location.css'
//Component
import LocationAdd from './LocationAdd'
import LocationCard from './LocationCard'


type LocationType = {
    location: LocationDataType
}


const Location = (props: LocationType) => {
    //Context
    const { locationToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Locations
    const [userLocations, setUserLocations] = useState<UserLocationsType[]>(props.location.userLocations)

    //Add Location State
    const [addLocationStatus, setAddLocationStatus] = useState<boolean>(false);

    //Live Update if change occurs
    const fetchLocations = async () => {
        const data: any = await getLocationsByUserID(_currentUserID)
        setUserLocations(data)
    }

    useDidMountUpdate(() => {
        fetchLocations()
    }, [locationToggle])


    return (
        <>
            <div className='location-wrapper'>
                <p>Addresses</p>

                <div className='locations'>
                    {userLocations.map((location, idx) => (
                        <LocationCard data={location} key={idx} />
                    ))}

                    <div className="add-location" onClick={() => setAddLocationStatus(true)}>
                        +
                    </div>
                </div>


            </div>

            <LocationAdd trigger={addLocationStatus} setTrigger={setAddLocationStatus} />
        </>
    )
}

export default Location