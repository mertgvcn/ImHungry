import React from 'react'
import { ChangeContextProvider } from '../../context/ChangeContext'
//Components
import Account from './components/Account/Account'
import Location from './components/Location/Location'
import CreditCard from './components/CreditCard/CreditCard'

const ProfilePage = () => {
  return (
    <>
      <Account />
      <Location />
      <CreditCard />
    </>
  )
}

export default ProfilePage