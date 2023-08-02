import React, { useContext, useState } from 'react'
import { UserContext } from '../../../UserContext'
//exported functions
import { Decrypt } from '../../../setup/Crypto/Cryption'
//Css
import '../styles/Location.css'
//Component
import Alert from '../../../components/Shared/Alert'

const Location = () => {
    //Local Storage
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Input States
    const [province, setProvince] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [neighbourhood, setNeighbourhood] = useState<string>("")
    const [address, setAddress] = useState<string>("") 

    //Alert States
    const [color, setColor] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleSave = async () => {

    }

    //Support functions
    const popAlert = (color: string, msg: string) => {
        setIsOpen(true)
        setColor(color)
        setMsg(msg)

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    return (
        <>
            <div className='address-wrapper'>
                <p>ADDRESSES</p>
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
                    <input value={address} type="text" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <button className='address-save' onClick={handleSave}>SAVE</button>
            </div>
            
            <Alert isOpen={isOpen} color={color} msg={msg} />
        </>
    )
}

export default Location