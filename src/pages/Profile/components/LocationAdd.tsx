import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { addLocation } from '../../../setup/API/location_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
//css
import '../styles/LocationAdd.css'
//components
import Alert from '../../../components/Shared/Alert'

type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const LocationAdd = (props: propsType) => {
    //Context
    const { toggle, setToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Add Location States
    const [province, setProvince] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [neighbourhood, setNeighbourhood] = useState<string>("")
    const [address, setAddress] = useState<string>("")

    //Alert States
    const [color, setColor] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAdd = async () => {
        if (checkInputs()) {
            try {
                const response = await addLocation(_currentUserID, province, district, neighbourhood, address)
                popAlert("green", "Addrees successfuly added")
                setToggle(!toggle)
                return response
            } catch (error) {
                popAlert("red", "Address could not be added")
            }
        }
    }

    //Support functions
    const checkInputs = () => {
        if (address.length > 120) {
            popAlert("orange", "Address is too long (should shorter than 120 character)")
            return false;
        }
        if (province.trim() == "" || district.trim() == "" || neighbourhood.trim() == "" || address.trim() == "") {
            popAlert("orange", "Dont leave blank spaces")
            return false;
        }

        return true;
    }

    const popAlert = (color: string, msg: string) => {
        setIsOpen(true)
        setColor(color)
        setMsg(msg)

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    return props.trigger ? (
        <div className='add-address-background'>
            <div className='add-address-wrapper'>

                <div className="close-add-address">
                    <i className="fa-solid fa-x" onClick={() => props.setTrigger(false)}></i>
                </div>

                <p>ADD ADDRESS</p>
                <div className='input-group'>
                    <p>Province</p>
                    <input value={province} type="text" onChange={(e) => { setProvince(e.target.value) }} />
                </div>
                <div className="input-group">
                    <p>District</p>
                    <input value={district} type="text" onChange={(e) => { setDistrict(e.target.value) }} />
                </div>
                <div className='input-group'>
                    <p>Neighbourhood</p>
                    <input value={neighbourhood} type="text" onChange={(e) => { setNeighbourhood(e.target.value) }} />
                </div>
                <div className="input-group">
                    <p>Address</p>
                    <textarea value={address} rows={4} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <button className='address-add' onClick={handleAdd}>ADD</button>
            </div >

            <Alert isOpen={isOpen} color={color} msg={msg} />
        </div>
    ) : null
}

export default LocationAdd