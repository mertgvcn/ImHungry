import React, { useContext } from 'react'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { deleteLocationByID } from '../../../setup/API/location_api'
//type
import { LocationCardType } from '../../../types/LocationType'
//css
import '../styles/LocationCard.css'

const LocationCard = ({ data: { locationTitle, province, district, neighbourhood, street, buildingNo, apartmentNo, addition , locationID } }: LocationCardType) => {
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

            <p style={{marginLeft: 2,fontSize:15}}><i className="fa-solid fa-location-dot" style={{ marginRight: 4, fontSize: 14 }}></i>{locationTitle}</p>
            <p>{province}/{district}</p>
            <p>{neighbourhood.length > 20 ? `${neighbourhood.substring(0,20)}.` : neighbourhood}</p>
            <p>{street ? `St:${street}` : null} {buildingNo ? `Bno:${buildingNo}` : null} {apartmentNo ? `Ano:${apartmentNo}` : null}</p>
            <p>{addition ? (addition.length > 20 ? `${addition.substring(0,20)}` : addition) : null}</p>
        </div>
    )
}

export default LocationCard