import React, { useContext, useEffect, useRef, useState } from 'react'
import { PaymentContext } from '../../context/PaymentContext'
import { UserContext } from '../../context/UserContext'
import { ChangeContext } from '../../context/ChangeContext'
//exported functions
import { deleteCC, getCC } from '../../setup/API/cc_api'
import { Decrypt } from '../../setup/Crypto/Cryption'
//css
import './styles/RegisteredCC.css'
//type
import { CCType } from '../../types/CCType'
//component
import CreditCardAdd from '../../pages/Profile/components/CreditCard/CreditCardAdd'

const RegisteredCC = () => {
    //Context
    const { ccID } = useContext(PaymentContext)
    const { creditCardToggle, setCreditCardToggle } = useContext(ChangeContext)
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
    }, [creditCardToggle])

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
                            <li key={idx}>

                                {/* CC Info */}
                                <div className='cc-info' onClick={() => {
                                    ccID.current = cc.ccID
                                    setDisplayedCC(`${cc.ccNo.slice(0, 4)} **** **** ${cc.ccNo.slice(15, 19)}`)
                                    setDropDownState(false)
                                    setIsAddCC(false)
                                }}>
                                    <i className="fa-solid fa-credit-card" style={{ marginRight: 5 }}></i>
                                    {cc.ccNo.slice(0, 4)} **** **** {cc.ccNo.slice(15, 19)}
                                </div>

                                {/* Delete CC */}
                                <div className='cc-delete' onClick={async () => {
                                    await deleteCC(cc.ccID)
                                    setDisplayedCC("")
                                    setCreditCardToggle(!creditCardToggle)
                                    setDropDownState(true)
                                }}>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* add new cc */}
                    <div className='add-new-card' onClick={handleAddCC}>
                        <i className="fa-regular fa-square-plus" style={{ marginLeft: 2, marginRight: 8 }}></i>
                        <p>Add new credit card...</p>
                    </div>
                </div>)}
            </div>

            <CreditCardAdd trigger={isAddCC} setTrigger={setIsAddCC} width='90%'/>
        </>

    )
}

export default RegisteredCC