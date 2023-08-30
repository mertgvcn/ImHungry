import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { Decrypt } from '../../../../setup/Crypto/Cryption'
//type
import { LocationType } from '../../../../types/LocationType'
//Css
import './styles/Location.css'
//Component
import LocationAdd from './LocationAdd'
import LocationCard from './LocationCard'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_APIKEY



const Location = () => {
    //Context
    const { locationToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Locations
    const [userLocations, setUserLocations] = useState<Array<LocationType>>([])

    //Add Location State
    const [addLocationStatus, setAddLocationStatus] = useState<boolean>(false);


    //fetch locations
    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        const fetchLocations = async () => {
            try {
                await axios.get('https://localhost:7181/api/Location/getLocationsByUserID', {
                    cancelToken: cancelToken.token,
                    params: {
                        userID: _currentUserID
                    },
                    headers: {
                        'x-api-key': API_KEY
                    }
                }).then((res) => {
                    setUserLocations(res.data)
                    console.log(userLocations)
                }).catch((err) => {})
            }catch (e) {
                
            }
        }

        const syncFetch = async () => {
            await fetchLocations()
        }

        syncFetch()

        return () => {
            cancelToken.cancel()
        }
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