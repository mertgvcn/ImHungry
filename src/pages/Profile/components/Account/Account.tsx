import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
//exported functions
import { Decrypt } from '../../../../setup/Crypto/Cryption'
import { searchUserName, updateAccountInfo } from '../../../../setup/API/user_api'
//css
import './styles/Account.css'
//components
import Alert from '../../../../components/Shared/Alert'
import ChangePass from './ChangePass'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_APIKEY



const Account = () => {
  //Local Storage
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //Input States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    defaultUserName: "",
    email: "",
    phoneNumber: ""
  })
  const [errors, setErrors] = useState<any>({})

  const emailPattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const phoneNumberPattern = new RegExp(/^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/);


  //fetch account info
  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    const fetchAccountInfo = async (): Promise<void> => {
      await axios('https://localhost:7181/api/User/getAccountInfo', {
        cancelToken: cancelToken.token,
        params: {
          userID: _currentUserID
        },
        headers: {
          'x-api-key': API_KEY
        }
      }).then((res) => {
        setFormData({
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
          userName: res.data[0].userName,
          defaultUserName: res.data[0].userName,
          email: res.data[0].email,
          phoneNumber: res.data[0].phoneNumber
        })
      }).catch((err) => {})

      return new Promise((resolve) => { resolve() })
    }

    const syncFetch = async () => {
      await fetchAccountInfo()
    }
    
    syncFetch()

    return () => {
      cancelToken.cancel()
    }
  }, [])


  //Functions
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData, [name]: value
    })
  }

  const handleSave = async () => {
    if (await Validation()) {
      setErrors({})
      try {
        await updateAccountInfo(_currentUserID, formData.firstName, formData.lastName, formData.userName, formData.email, formData.phoneNumber)
        popAlert("green", "Account Informations Updated Successfuly")
      } catch (error) {

      }
    }
  }

  const Validation = async () => {
    let isValid = true
    const validationErrors: any = {}

    //firstname
    if (!formData.firstName.trim()) {
      validationErrors.firstName = "*First name cannot be left blank"
    }
    else if (formData.firstName.trim().length < 2 || formData.firstName.trim().length > 25) {
      validationErrors.firstName = "*First name must be between 2-25 characters"
    }

    //lastname
    if (!formData.lastName.trim()) {
      validationErrors.lastName = "*Last name cannot be left blank"
    }
    else if (formData.lastName.trim().length < 2 || formData.lastName.trim().length > 25) {
      validationErrors.lastName = "*Last name must be between 2-25 characters"
    }

    //username
    if (!formData.userName.trim()) {
      validationErrors.userName = "*Username cannot be left blank"
    }
    else if (formData.userName.trim().length < 4 || formData.userName.trim().length > 25) {
      validationErrors.userName = "*Username must be between 4-25 characters"
    }
    else if (formData.userName.trim() !== formData.defaultUserName) {
      if (await searchUserName(formData.userName.trim())) {
        validationErrors.userName = "*Username must be unique"
      }
    }

    //email
    if (!formData.email.trim()) {
      validationErrors.email = "*Email cannot be left blank"
    }
    else if (!emailPattern.test(formData.email)) {
      validationErrors.email = "*Email is not valid"
    }

    //phonenumber
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = "*Phone number cannot be left blank"
    }
    else if (!phoneNumberPattern.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "*Phone number is not valid"
    }

    if (Object.keys(validationErrors).length != 0) {
      isValid = false
      setErrors(validationErrors)
    }

    return isValid
  }


  //Change Pass State
  const [changePassTrigger, setChangePassTrigger] = useState<boolean>(false)
  const handleChangePassword = () => {
    setChangePassTrigger(true)
  }


  //Alert States
  const [color, setColor] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <div className='account-wrapper'>
        <p>Account</p>

        <div className='input-group'>
          <p>First Name</p>
          <input name="firstName" type="text" placeholder={formData.firstName} onChange={handleChange} />
          <div>
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>
        </div>

        <div className="input-group">
          <p>Last Name</p>
          <input name="lastName" type="text" placeholder={formData.lastName} onChange={handleChange} />
          <div>
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
        </div>

        <div className='input-group'>
          <p>Username</p>
          <input name="userName" type="text" placeholder={formData.userName} onChange={handleChange} />
          <div>
            {errors.userName && <span>{errors.userName}</span>}
          </div>
        </div>

        <div className="input-group">
          <p>Email</p>
          <input name="email" type="text" placeholder={formData.email} onChange={handleChange} />
          <div>
            {errors.email && <span>{errors.email}</span>}
          </div>
        </div>

        <div className="input-group">
          <p>Phone Number</p>
          <input name="phoneNumber" type="text" placeholder={formData.phoneNumber} onChange={handleChange} />
          <div>
            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
          </div>
        </div>

        <button className='account-save' onClick={handleSave}>Save</button>

        <button className="change-password" onClick={handleChangePassword}>Change Password</button>
      </div>

      <Alert isOpen={isOpen} color={color} msg={msg} />
      <ChangePass trigger={changePassTrigger} setTrigger={setChangePassTrigger} />
    </>
  )
}

export default Account