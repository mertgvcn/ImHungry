import React from 'react'
import { ChangeContextProvider } from '../../context/ChangeContext'
//Components
import Account from './components/Account'
import Location from './components/Location'
import ChangePass from './components/ChangePass'

const ProfilePage = () => {
  return (
    <ChangeContextProvider>
        <Account/>
        <Location/>
        <ChangePass/>
    </ChangeContextProvider>
  )
}

export default ProfilePage