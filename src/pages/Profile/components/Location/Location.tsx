import { useContext, useState } from 'react'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { GetUserLocationList } from '../../../../setup/API/location_api'
import useDidMountUpdate from '../../../../hooks/useDidMountUpdate'
//models
import { LocationViewModel } from '../../../../models/ViewModels/LocationViewModel'
//Css
import './styles/Location.css'
//Component
import LocationAdd from './LocationAdd'
import LocationCard from './LocationCard'


type LocationType = {
    locations: LocationViewModel[]
}


const Location = (props: LocationType) => {
    //Context
    const { locationToggle } = useContext(ChangeContext)

    //Locations
    const [userLocations, setUserLocations] = useState<LocationViewModel[]>(props.locations)

    //Add Location State
    const [addLocationStatus, setAddLocationStatus] = useState<boolean>(false);

    //Live Update if change occurs
    const fetchLocations = async () => {
        const data: any = await GetUserLocationList()
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