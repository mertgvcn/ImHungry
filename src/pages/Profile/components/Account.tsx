import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
//css
import '../styles/Account.css'
import { Decrypt } from '../../../setup/Crypto/Cryption'
import { getAccountInfo, searchUserName, updateAccountInfo } from '../../../setup/API/user_api'
import Alert from '../../../components/Shared/Alert'

const Account = () => {
  //Local Storage
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //Input States
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [defaultUserName, setDefaultUserName] = useState<string>("") //username değişmişse database de var mı kontrol için
  const [email, setEmail] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  //Alert States
  const [color, setColor] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //FETCH ACCOUNT INFO
  const fetchAccountInfo = async () => {
    const data = await getAccountInfo(_currentUserID)
    setFirstName(data[0].firstName)
    setLastName(data[0].lastName)
    setUserName(data[0].userName)
    setDefaultUserName(data[0].userName)
    setEmail(data[0].email)
    setPhoneNumber(data[0].phoneNumber)
  }

  useEffect(() => {
    fetchAccountInfo()
  }, [])

  const handleSave = async () => {
    if (userName.trim() !== defaultUserName) {
      if (await searchUserName(userName.trim())) {
        popAlert("red", "User name is taken by another user")
        return;
      }
    }

    try {
      await updateAccountInfo(_currentUserID, firstName, lastName, userName, email, phoneNumber)
      popAlert("green", "Update successful")
    } catch (error) {
      popAlert("red", "Update unsuccessful")
    }
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
      <div className='account-wrapper'>
        <p>ACCOUNT</p>
        <div className='input-group'>
          <p>First Name</p>
          <input value={firstName} type="text" onChange={(e) => { setFirstName(e.target.value) }} />
        </div>
        <div className="input-group">
          <p>Last Name</p>
          <input value={lastName} type="text" onChange={(e) => { setLastName(e.target.value) }} />
        </div>
        <div className='input-group'>
          <p>User Name</p>
          <input value={userName} type="text" onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div className="input-group">
          <p>Email</p>
          <input value={email} type="text" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="input-group">
          <p>Phone Number</p>
          <input value={phoneNumber} type="text" onChange={(e) => { setPhoneNumber(e.target.value) }} />
        </div>
        <button className='account-save' onClick={handleSave}>SAVE</button>
      </div>
      <Alert isOpen={isOpen} color={color} msg={msg} />
    </>

  )
}

export default Account