import React, { useContext } from 'react'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { deleteLocationByID } from '../../../../setup/API/location_api'
//type
import { LocationCardType } from '../../../../types/LocationType'
//css
import './styles/LocationCard.css'

const LocationCard = ({ data: { locationTitle, province, district, neighbourhood, street, buildingNo, buildingAddition, apartmentNo, note, locationID } }: LocationCardType) => {
    const { locationToggle, setLocationToggle } = useContext(ChangeContext)

    const deleteLocation = async () => {
        try {
            await deleteLocationByID(locationID);
            setLocationToggle(!locationToggle)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='location-card-wrapper'>
            <div className='delete-location'>
                <i className="fa-solid fa-circle-minus" onClick={deleteLocation}></i>
            </div>

            <p style={{ marginLeft: 2, fontSize: 18, marginBottom: 5 }}><i className="fa-solid fa-location-dot" style={{ marginRight: 4, fontSize: 14 }}></i>{locationTitle}</p>

            <div>
                <p style={{ marginLeft: 10, fontSize: 16, marginBottom: 5, color: "#402E32" }}>{province}/{district}</p>
            </div>

            <p className='info'>{neighbourhood}</p>

            <p className='info'>{street ? `${street}` : null}</p>

            <p className='info'>
                {buildingNo ? `${buildingNo}` : null}{buildingAddition ? `/${buildingAddition}` : null} {apartmentNo ? `- ${apartmentNo}` : null}
            </p>

            <p className='info'>{note ? `${note}` : null}</p>
        </div>
    )
}

export default LocationCard