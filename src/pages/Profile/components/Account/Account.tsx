import { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
//exported functions
import { Decrypt } from '../../../../setup/Cryption'
import { VerifyUsername, SetAccountInfo } from '../../../../setup/API/user_api'
import { usePopAlert } from '../../../../hooks/usePopAlert'
//css
import './styles/Account.css'
//type
import { AccountInfoType } from '../../../../types/UserDataType'
//components
import Alert from '../../../../components/Shared/Alert'
import ChangePass from './ChangePass'
import { SetAccountInfoRequest } from '../../../../models/parameters/userParams/SetAccountInfoRequest'


const emailPattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const phoneNumberPattern = new RegExp(/^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/);


type AccountType = {
  accountInfo : AccountInfoType
}


const Account = (props: AccountType) => {
  //Local Storage
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //States
  const [formData, setFormData] = useState({
    firstName: props.accountInfo.firstName,
    lastName: props.accountInfo.lastName,
    userName: props.accountInfo.userName,
    defaultUserName: props.accountInfo.userName,
    email: props.accountInfo.email,
    phoneNumber: props.accountInfo.phoneNumber
  })
  const [errors, setErrors] = useState<any>({})
  const [changePassTrigger, setChangePassTrigger] = useState<boolean>(false)
  const {alertStates, popAlert} = usePopAlert()


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
        const accountParams: SetAccountInfoRequest = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          userName: formData.userName,
          email: formData.email,
          phoneNumber: formData.phoneNumber
        }

        await SetAccountInfo(accountParams)
        popAlert("green", "Account Informations Updated Successfuly")
      }
      catch (error) {
        console.log(error)
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
      if (await VerifyUsername(formData.userName.trim())) {
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
        <button className="change-password" onClick={() => setChangePassTrigger(true)}>Change Password</button>
      </div>

      <Alert isOpen={alertStates.isOpen} color={alertStates.color} msg={alertStates.msg} />
      <ChangePass trigger={changePassTrigger} setTrigger={setChangePassTrigger} />
    </>
  )
}

export default Account