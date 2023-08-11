import React, { useContext, useEffect, useRef, useState } from 'react'
import { PaymentContext } from '../../../context/PaymentContext'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { deleteCC, getCC } from '../../../setup/API/cc_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
//css
import '../styles/RegisteredCC.css'
//type
import { CCType } from '../../../types/CCType'
//component
import AddCC from './AddCC'

const RegisteredCC = () => {
    //Context
    const { ccID } = useContext(PaymentContext)
    const { toggle, setToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //CC states
    const [userCCs, setUserCCs] = useState<Array<CCType>>([])
    const [displayedCC, setDisplayedCC] = useState<string>("")
    const [dropDownState, setDropDownState] = useState<boolean>(false)

    //Add cc state
    const [isAddCC, setIsAddCC] = useState<boolean>(false)

    const fetchCC = async () => {
        const data = await getCC(_currentUserID)
        setUserCCs(data)
    }

    useEffect(() => {
        fetchCC()
    }, [])

    useEffect(() => {
        fetchCC()
    }, [toggle])

    const handleAddCC = () => {
        setIsAddCC(true)
        setDropDownState(false)
    }

    return (
        <>
            <div className='registered-cc-wrapper'>

                {/* Title */}
                <div className="registered-cc-title-wrapper">
                    <p id='registered-cc-title'>Registered Cards</p>
                </div>

                {/* BODY */}
                <div className="cc-selection" onClick={() => setDropDownState(!dropDownState)}>
                    <i className="fa-solid fa-credit-card" style={{ marginRight: 5 }}></i>
                    <input id="current-cc" type="text" placeholder='Select Credit Card'
                        value={displayedCC} readOnly={true} />
                    <i className="fa-solid fa-chevron-down"></i>
                </div>

                {/* DROP DOWN SELECTION */}
                {dropDownState && (<div className='cc-list'>
                    <ul>
                        {/* cc list */}
                        {userCCs.map((cc, idx) => (
                            <li key={idx} onClick={() => {
                                ccID.current = cc.ccID
                                setDisplayedCC(`${cc.ccNo.slice(0, 4)} **** **** ${cc.ccNo.slice(12, 16)}`)
                                setDropDownState(false)
                                setIsAddCC(false)
                            }}>
                                <div>
                                    <i className="fa-solid fa-credit-card" style={{ marginRight: 5 }}></i>
                                    {cc.ccNo.slice(0, 4)} **** **** {cc.ccNo.slice(12, 16)}
                                    <i className="fa-solid fa-trash" style={{ float: 'right' }} onClick={async () => {
                                        await deleteCC(cc.ccID)
                                        setDisplayedCC("")
                                        setToggle(!toggle)
                                        setDropDownState(true)
                                    }}></i>
                                </div>
                            </li>
                        ))}

                        {/* add new cc */}
                        <li onClick={handleAddCC}>
                            <i className="fa-regular fa-square-plus" style={{ marginRight: 5 }}></i>
                            <p>Add new credit card...</p>
                        </li>
                    </ul>
                </div>)}
            </div>

            <AddCC trigger={isAddCC} setTrigger={setIsAddCC} />
        </>

    )
}

export default RegisteredCC