import React, { useContext, useState } from 'react'
import { UserContext } from '../../../UserContext'
//CSS
import '../styles/ChangePass.css'
//exported functions
import { Decrypt } from '../../../setup/Crypto/Cryption'
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

    const handleSave = () => {

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
    <div className='change-pass-wrapper'>
      <p>PASSWORD</p>
      <div className='input-group'>
        <p>Current Password</p>
        <input value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} />
      </div>
      <div className="input-group">
        <p>New Password</p>
        <input value={newPassword} type="password" onChange={(e) => { setNewPassword(e.target.value) }} />
      </div>
      <button className='change-pass-save' onClick={handleSave}>SAVE</button>
    </div>
    <Alert isOpen={isOpen} color={color} msg={msg} />
  </>
  )
}

export default ChangePass