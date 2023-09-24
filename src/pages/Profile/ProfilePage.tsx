//helpers
import { PROFILE_PAGE_URL, useFetchData } from '../../hooks/useFetchData'
//type
import { ProfilePageDataType } from '../../types/PageDataTypes/ProfilePageDataType'
//components
import Account from './components/Account/Account'
import Location from './components/Location/Location'
import CreditCard from './components/CreditCard/CreditCard'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Decrypt } from '../../setup/Cryption'



const ProfilePage = () => {
  const {currentUserID} = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  const {data,isSuccess} = useFetchData<ProfilePageDataType>(PROFILE_PAGE_URL, {userID: _currentUserID})

  return isSuccess ? 
  (
    <>
      <Account accountInfo={data!.accountInfo}/>
      <Location location={data!.location}/>
      <CreditCard creditCard={data!.creditCard}/>
    </>
  )
  :
  (
    <>Loading...</>
  )
}

export default ProfilePage