import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { addCC } from '../../../setup/API/cc_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
//css
import '../styles/AddCC.css'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}


const AddCC = (props: propsType) => {
    //Context
    const { toggle, setToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Credit cart info
    const [creditCardNo, setCreditCardNo] = useState<string>("")
    const [nameOnCC, setNameOnCC] = useState<string>("")
    const [month, setMonth] = useState<string>("")
    const [year, setYear] = useState<string>("")
    const [cvv, setCvv] = useState<string>("")

    //ALERT PROPERTIES
    const [color, setColor] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (creditCardNo.length != 16) {
            popAlert("red", "Enter valid credit cart number")
            return;
        }
        if (nameOnCC.length < 5) {
            popAlert("red", "Enter valid name")
            return;
        }

        try {
            await addCC(_currentUserID, creditCardNo, nameOnCC, parseInt(month), parseInt(year), parseInt(cvv))
            popAlert("green", "CC added succesfully")
            setToggle(!toggle)
            setTimeout(() => {
                setCreditCardNo("")
                setNameOnCC("")
                setMonth("")
                setYear("")
                setCvv("")
                props.setTrigger(false)
            }, 1500)
            return;
        } catch (error) {
            popAlert("red", "CC could not be added")
        }

    }

    //Support functions
    const popAlert = (color: string, msg: string) => {
        setColor(color)
        setIsOpen(true)
        setMsg(msg)

        setTimeout(() => {
            setIsOpen(false)
        }, 2000)
    }


    return props.trigger ? (

        <div className='payment-wrapper'>

            {/* TITLE */}
            <div className='payment-title-wrapper'>
                <p id='payment-title'>Add Credit Card</p>
            </div>

            {/* BODY */}
            <div className="credit-card-info">
                <p>Credit Card Infos</p>

                <div className='input-group'>
                    <p>Credit Card No</p>
                    <input value={creditCardNo} type="number" onChange={(e) => { setCreditCardNo(e.target.value) }}
                        onInput={(e) => {
                            if (e.currentTarget.value.length > 16) e.currentTarget.value = e.currentTarget.value.slice(0, 16);
                        }} />
                </div>

                <div className='input-group'>
                    <p>Name on the Card</p>
                    <input value={nameOnCC} type="text" onChange={(e) => { setNameOnCC(e.target.value) }} />
                </div>

                <div className="row">
                    <div className='row'>
                        <div className='input-group' style={{ marginRight: 4 }}>
                            <p>Month</p>
                            <input value={month} type="number" onChange={(e) => { setMonth(e.target.value) }}
                                onInput={(e) => {
                                    if (e.currentTarget.value.length > 2) e.currentTarget.value = e.currentTarget.value.slice(0, 2);
                                    if (e.currentTarget.valueAsNumber > 12) e.currentTarget.value = "12";
                                    if (e.currentTarget.valueAsNumber < 1) e.currentTarget.value = "1";
                                }} />
                        </div>
                        <div className='input-group'>
                            <p>Year</p>
                            <input value={year} type="number" placeholder='20xx' onChange={(e) => { setYear(e.target.value) }}
                                onInput={(e) => {
                                    if (e.currentTarget.value.length > 4) e.currentTarget.value = e.currentTarget.value.slice(0, 4);
                                    if (e.currentTarget.valueAsNumber > 2053) e.currentTarget.value = "2053";
                                    if (e.currentTarget.value.length >= 4 && e.currentTarget.valueAsNumber < 2023) e.currentTarget.value = "2023";
                                }} />
                        </div>
                    </div>
                    <div className='input-group'>
                        <p>CVV</p>
                        <input value={cvv} type="number" onChange={(e) => { setCvv(e.target.value) }}
                            onInput={(e) => {
                                if (e.currentTarget.value.length > 3) e.currentTarget.value = e.currentTarget.value.slice(0, 3);
                            }} />
                    </div>
                </div>

                <div className="button-wrapper">
                    <input id="submit-cc" type="button" value="Submit" onClick={handleSubmit} />
                </div>

            </div>

            {isOpen &&
                <div className="add-cc-alert" style={{ backgroundColor: color }}>
                    <p>{msg}</p>
                </div>}
        </div>

    ) : null
}

export default AddCC