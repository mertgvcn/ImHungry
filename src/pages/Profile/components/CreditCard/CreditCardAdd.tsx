import React, { useContext, useState } from 'react'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { AddCreditCard } from '../../../../setup/API/cc_api'
import { usePopAlert } from '../../../../hooks/usePopAlert'
//css
import './styles/CreditCardAdd.css'
//models
import { AddCreditCardRequest } from '../../../../models/ParameterModels/CreditCardParameterModels'
//component
import Alert from '../../../../components/Shared/Alert'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
    width: string,
}


const CreditCardAdd = (props: propsType) => {
    //Context
    const { creditCardToggle, setCreditCardToggle } = useContext(ChangeContext)

    //Input states
    const [formData, setFormData] = useState({
        CreditCardNumber: "",
        CreditCardHolderName: "",
        ExpirationDate: "",
        CVV: ""
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
                    CreditCardNumber: formData.CreditCardNumber,
                    CreditCardHolderName: formData.CreditCardHolderName,
                    ExpirationDate: formData.ExpirationDate,
                    CVV: parseInt(formData.CVV)
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
        if (!formData.CreditCardNumber.trim()) {
            validationErrors.CreditCardNumber = "*Required"
        }
        else if (formData.CreditCardNumber.length < 19 || !/^[\d ]*$/.test(formData.CreditCardNumber)) {
            validationErrors.CreditCardNumber = "*Invalid credit card number"
        }

        //cardholder name
        if (!formData.CreditCardHolderName.trim()) {
            validationErrors.CreditCardHolderName = "*Required"
        }
        else if (formData.CreditCardHolderName.length < 4 || !/^[a-zA-Z\s]*$/.test(formData.CreditCardHolderName)) {
            validationErrors.CreditCardHolderName = "*Invalid name"
        }

        //expiration date
        if (!formData.ExpirationDate.trim()) {
            validationErrors.ExpirationDate = "*Required"
        }
        else if (formData.ExpirationDate.length < 5) {
            validationErrors.ExpirationDate = "*Invalid date"
        }
        else {
            const month = parseInt(formData.ExpirationDate.slice(0, 2))
            const year = parseInt(formData.ExpirationDate.slice(3, 5))

            const date = new Date()
            const currentMonth = date.getMonth() + 1
            const currentYear = parseInt(date.getFullYear().toString().slice(2, 4))

            if (year < 23 || year > 53) {
                validationErrors.ExpirationDate = "*Invalid date"
            }
            else if (year == currentYear && month < currentMonth) {
                validationErrors.ExpirationDate = "*Invalid date"
            }
        }

        //cvv
        if (!formData.CVV.trim()) {
            validationErrors.CVV = "*Required"
        }
        else if (formData.CVV.length < 3) {
            validationErrors.CVV = "*Invalid cvv"
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
            CreditCardNumber: "",
            CreditCardHolderName: "",
            ExpirationDate: "",
            CVV: ""
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
                    <input name="CreditCardNumber" type="text" placeholder="**** **** **** ****" onChange={handleChange}
                        value={formData.CreditCardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                        onInput={(e) => {
                            if (e.currentTarget.value.length > 19) e.currentTarget.value = e.currentTarget.value.slice(0, 19);
                        }} />
                    <div>
                        {errors.CreditCardNumber && <span>{errors.CreditCardNumber}</span>}
                    </div>
                </div>

                <div className='input-group'>
                    <p>Cardholder Name</p>
                    <input name="CreditCardHolderName" type="text" onChange={handleChange}
                        onInput={(e) => {
                            if (e.currentTarget.value.length > 50) e.currentTarget.value = e.currentTarget.value.slice(0, 50);
                        }} />
                    <div>
                        {errors.CreditCardHolderName && <span>{errors.CreditCardHolderName}</span>}
                    </div>
                </div>

                <div className="row">

                    <div className='input-group'>
                        <p>Expiration Date</p>
                        <input name="ExpirationDate" type="text" placeholder="MM/YY" onChange={handleChange} style={{ width: 120 }}
                            value={formData.ExpirationDate.replace(
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
                            {errors.ExpirationDate && <span>{errors.ExpirationDate}</span>}
                        </div>
                    </div>

                    <div className='input-group'>
                        <p>CVV</p>
                        <input name="CVV" type="number" placeholder="***" onChange={handleChange}
                            onInput={(e) => {
                                if (e.currentTarget.value.length > 3) e.currentTarget.value = e.currentTarget.value.slice(0, 3);
                            }} />
                        <div>
                            {errors.CVV && <span>{errors.CVV}</span>}
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