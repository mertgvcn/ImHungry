import React, { useContext } from 'react'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { deleteLocationByID } from '../../../setup/API/location_api'
//type
import { LocationCardType } from '../../../types/LocationType'
//css
import '../styles/LocationCard.css'

const LocationCard = ({ data: { province, district, neighbourhood, address, locationID } }: LocationCardType) => {
    const { toggle, setToggle } = useContext(ChangeContext)

    const deleteLocation = async () => {
        try {
            await deleteLocationByID(locationID);
            setToggle(!toggle)
        }catch(error) {
            console.log(error)
        }   
    }

    return (
        <div className='location-card-wrapper'>
            <div className='delete-location'>
                <i className="fa-solid fa-circle-minus" onClick={deleteLocation}></i>
            </div>

            <p id='location-province-district' style={{fontSize:15}}>{province}/{district}</p>
            <p id='location-neighbourhood'>{neighbourhood}</p>
            <p id='location-address'>{address}</p>
        </div>
    )
}

export default LocationCard