import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { AddCreditCard } from '../../../../setup/API/cc_api'
import { Decrypt } from '../../../../setup/Cryption'
import { usePopAlert } from '../../../../hooks/usePopAlert'
//css
import './styles/CreditCardAdd.css'
//component
import Alert from '../../../../components/Shared/Alert'
import { AddCreditCardRequest } from '../../../../models/parameters/creditCardParams/AddCreditCardRequest'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    width: string,
}


const CreditCardAdd = (props: propsType) => {
    //Context
    const { creditCardToggle, setCreditCardToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Input states
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolderName: "",
        expirationDate: "",
        cvv: ""
    })
    const [errors, setErrors] = useState<any>({})
    const {alertStates, popAlert} = usePopAlert()

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = async () => {
        if (Validation()) {
            try {
                const addCreditCardRequest: AddCreditCardRequest = {
                    creditCardNumber: formData.cardNumber,
                    creditCardHolderName: formData.cardHolderName,
                    expirationDate: formData.expirationDate,
                    cvv: parseInt(formData.cvv)
                }

                await AddCreditCard(addCreditCardRequest)
                popAlert("green", "Card added succesfully")
                setCreditCardToggle(!creditCardToggle)
                resetInputs()
                setTimeout(() => {
                    props.setTrigger(false)
                }, 2000)
                return;
            } catch (error) {
                popAlert("red", "Card could not be added")
            }
        }
    }

    //Support functions
    const Validation = () => {
        let isValid = true
        const validationErrors: any = {}

        //card number
        if (!formData.cardNumber.trim()) {
            validationErrors.cardNumber = "*Required"
        }
        else if (formData.cardNumber.length < 19 || !/^[\d ]*$/.test(formData.cardNumber)) {
            validationErrors.cardNumber = "*Invalid credit card number"
        }

        //cardholder name
        if (!formData.cardHolderName.trim()) {
            validationErrors.cardHolderName = "*Required"
        }
        else if (formData.cardHolderName.length < 4 || !/^[a-zA-Z\s]*$/.test(formData.cardHolderName)) {
            validationErrors.cardHolderName = "*Invalid name"
        }

        //expiration date
        if (!formData.expirationDate.trim()) {
            validationErrors.expirationDate = "*Required"
        }
        else if (formData.expirationDate.length < 5) {
            validationErrors.expirationDate = "*Invalid date"
        }
        else {
            const month = parseInt(formData.expirationDate.slice(0, 2))
            const year = parseInt(formData.expirationDate.slice(3, 5))

            const date = new Date()
            const currentMonth = date.getMonth() + 1
            const currentYear = parseInt(date.getFullYear().toString().slice(2, 4))

            if (year < 23 || year > 53) {
                validationErrors.expirationDate = "*Invalid date"
            }
            else if (year == currentYear && month < currentMonth) {
                validationErrors.expirationDate = "*Invalid date"
            }
        }

        //cvv
        if (!formData.cvv.trim()) {
            validationErrors.cvv = "*Required"
        }
        else if (formData.cvv.length < 3) {
            validationErrors.cvv = "*Invalid cvv"
        }


        if (Object.keys(validationErrors).length != 0) {
            isValid = false
            setErrors(validationErrors)
        }

        return isValid
    }

    const resetInputs = () => {
        setErrors({})
        setFormData({
            cardNumber: "",
            cardHolderName: "",
            expirationDate: "",
            cvv: ""
        })
    }


    return props.trigger ? (

        <div className='payment-wrapper' style={{width: props.width}}>

            {/* TITLE */}
            <div className='payment-title-wrapper'>
                <p id='payment-title'>Add Credit Card</p>
            </div>

            {/* BODY */}
            <div className="credit-card-info">
                <div className='row'>
                    <p>Credit Card Information</p>

                    <div className="close-add-card">
                        <i className="fa-solid fa-x" onClick={() => {
                            resetInputs();
                            props.setTrigger(false);
                        }}></i>
                    </div>
                </div>

                <div className='input-group'>
                    <p>Card Number</p>
                    <input name="cardNumber" type="text" placeholder="**** **** **** ****" onChange={handleChange}
                        value={formData.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                        onInput={(e) => {
                            if (e.currentTarget.value.length > 19) e.currentTarget.value = e.currentTarget.value.slice(0, 19);
                        }} />
                    <div>
                        {errors.cardNumber && <span>{errors.cardNumber}</span>}
                    </div>
                </div>

                <div className='input-group'>
                    <p>Cardholder Name</p>
                    <input name="cardHolderName" type="text" onChange={handleChange}
                        onInput={(e) => {
                            if (e.currentTarget.value.length > 50) e.currentTarget.value = e.currentTarget.value.slice(0, 50);
                        }} />
                    <div>
                        {errors.cardHolderName && <span>{errors.cardHolderName}</span>}
                    </div>
                </div>

                <div className="row">

                    <div className='input-group'>
                        <p>Expiration Date</p>
                        <input name="expirationDate" type="text" placeholder="MM/YY" onChange={handleChange} style={{ width: 120 }}
                            value={formData.expirationDate.replace(
                                /[^0-9]/g, '' // To allow only numbers
                            ).replace(
                                /^([2-9])$/g, '0$1' // To handle 3 > 03
                            ).replace(
                                /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
                            ).replace(
                                /^0{1,}/g, '0' // To handle 00 > 0
                            ).replace(
                                /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
                            )}
                            onInput={(e) => {
                                if (e.currentTarget.value.length > 5) e.currentTarget.value = e.currentTarget.value.slice(0, 5);
                            }} />
                        <div>
                            {errors.expirationDate && <span>{errors.expirationDate}</span>}
                        </div>
                    </div>

                    <div className='input-group'>
                        <p>CVV</p>
                        <input name="cvv" type="number" placeholder="***" onChange={handleChange}
                            onInput={(e) => {
                                if (e.currentTarget.value.length > 3) e.currentTarget.value = e.currentTarget.value.slice(0, 3);
                            }} />
                        <div>
                            {errors.cvv && <span>{errors.cvv}</span>}
                        </div>
                    </div>

                </div>

                <div className="button-wrapper">
                    <input id="submit-cc" type="button" value="Submit" onClick={handleSubmit} />
                </div>

            </div>

            <Alert isOpen={alertStates.isOpen} color={alertStates.color} msg={alertStates.msg} />
        </div>

    ) : null
}

export default CreditCardAdd