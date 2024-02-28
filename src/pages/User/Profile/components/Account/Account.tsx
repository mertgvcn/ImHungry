import { useState } from 'react'
//exported functions
import { VerifyUsername, SetAccountInfo } from '../../../../../setup/API/UserAPIs/user_api'
import { usePopAlert } from '../../../../../hooks/usePopAlert'
//css
import './styles/Account.css'
//models
import { UserAccountViewModel } from '../../../../../models/ViewModels/UserAccountViewModel'
//components
import Alert from '../../../../../components/Shared/Alert'
import ChangePass from './ChangePass'


const emailPattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const phoneNumberPattern = new RegExp(/^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/);


type AccountType = {
  accountInfo : UserAccountViewModel
}


const Account = (props: AccountType) => {

  //States
  const [formData, setFormData] = useState({
    firstName: props.accountInfo.FirstName,
    lastName: props.accountInfo.LastName,
    username: props.accountInfo.Username,
    defaultUsername: props.accountInfo.Username,
    email: props.accountInfo.Email,
    phoneNumber: props.accountInfo.PhoneNumber
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
        const accountParams: UserAccountViewModel = {
          FirstName: formData.firstName,
          LastName: formData.lastName,
          Username: formData.username,
          Email: formData.email,
          PhoneNumber: formData.phoneNumber
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
    if (!formData.username.trim()) {
      validationErrors.userName = "*Username cannot be left blank"
    }
    else if (formData.username.trim().length < 4 || formData.username.trim().length > 25) {
      validationErrors.userName = "*Username must be between 4-25 characters"
    }
    else if (formData.username.trim() !== formData.defaultUsername) {
      if (await VerifyUsername(formData.username.trim())) {
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
          <input name="userName" type="text" placeholder={formData.username} onChange={handleChange} />
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