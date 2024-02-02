import { useContext } from 'react'
import { ChangeContext } from '../../../../../context/ChangeContext'
//exported functions
import { DeleteLocationByLocationID } from '../../../../../setup/API/location_api'
//type
import { LocationViewModel } from '../../../../../models/ViewModels/LocationViewModel'
//css
import './styles/LocationCard.css'

type LocationCardType = {
    data: LocationViewModel
}

const LocationCard = ({ data: { Title, Province, District, Neighbourhood, Street, BuildingNo, BuildingAddition, ApartmentNo, Note, Id } }: LocationCardType) => {
    const { locationToggle, setLocationToggle } = useContext(ChangeContext)

    const deleteLocation = async () => {
        try {
            await DeleteLocationByLocationID(Id);
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

            <p style={{ marginLeft: 2, fontSize: 18, marginBottom: 5 }}><i className="fa-solid fa-location-dot" style={{ marginRight: 4, fontSize: 14 }}></i>{Title}</p>

            <div>
                <p style={{ marginLeft: 10, fontSize: 16, marginBottom: 5, color: "#402E32" }}>{Province}/{District}</p>
            </div>

            <p className='info'>{Neighbourhood}</p>

            <p className='info'>{Street ? `${Street}` : null}</p>

            <p className='info'>
                {BuildingNo ? `${BuildingNo}` : null}{BuildingAddition ? `/${BuildingAddition}` : null} {ApartmentNo ? `- ${ApartmentNo}` : null}
            </p>

            <p className='info'>{Note ? `${Note}` : null}</p>
        </div>
    )
}

export default LocationCard