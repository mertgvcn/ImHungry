import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
//CSS
import '../styles/ChangePass.css'
//exported functions
import { Decrypt, Encode } from '../../../setup/Crypto/Cryption'
import { changePass } from '../../../setup/API/user_api'
//Component
import Alert from '../../../components/Shared/Alert'

const ChangePass = () => {
  //Local Storage
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //Input States
  const [password, setPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")

  //Alert States
  const [color, setColor] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSave = async () => {
    if (checkPasswordValidty(newPassword)) {
      const msg = await changePass(_currentUserID, Encode(password), Encode(newPassword))

      if (msg === "Password updated") {
        popAlert("green", msg)
        setPassword("")
        setNewPassword("")
      } else {
        popAlert("red", msg)
      }
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

  const checkPasswordValidty = (password: string) => {
    if (password.trim().length < 8) {
      popAlert("orange", "Password must be at least 8 characters")
      return false;
    } else if (!stringHasNumber(password)) {
      popAlert("orange", "Password must contain at least one numeric value")
      return false;
    }

    return true;
  }

  function stringHasNumber(text: string): boolean {
    return /\d/.test(text);
  }

  return (
    <>
      <div className='change-pass-wrapper'>
        <p>Password</p>
        <div className='input-group'>
          <p>Current Password</p>
          <input value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className="input-group">
          <p>New Password</p>
          <input value={newPassword} type="password" onChange={(e) => { setNewPassword(e.target.value) }} />
        </div>
        <button className='change-pass-save' onClick={handleSave}>Save</button>
      </div>
      <Alert isOpen={isOpen} color={color} msg={msg} />
    </>
  )
}

export default ChangePass