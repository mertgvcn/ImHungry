import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { Decrypt } from '../../../setup/Crypto/Cryption'
import { getLocationsByUserID } from '../../../setup/API/location_api'
//type
import { LocationType } from '../../../types/LocationType'
//Css
import '../styles/Location.css'
//Component
import LocationAdd from './LocationAdd'
import LocationCard from './LocationCard'


const Location = () => {
    //Context
    const { toggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Locations
    const [userLocations, setUserLocations] = useState<Array<LocationType>>([])

    //Add Location State
    const [addLocationStatus, setAddLocationStatus] = useState<boolean>(false);

    const fetchUserLocations = async () => {
        const data = await getLocationsByUserID(_currentUserID)
        setUserLocations(data)
    }

    useEffect(() => {
      fetchUserLocations()
    }, [toggle])
    

    return (
        <>
            <div className='location-wrapper'>
                <p>ADDRESSES</p>

                <div className='locations'>

                    {userLocations.map((location, idx) => (
                        <LocationCard data={location} key={idx}/>
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