//helpers
import { PROFILE_PAGE_URL, useFetchData } from '../../hooks/useFetchData'
//type
import { ProfilePageDataType } from '../../types/PageDataTypes/ProfilePageDataType'
//components
import Account from './components/Account/Account'
import Location from './components/Location/Location'
import CreditCard from './components/CreditCard/CreditCard'



const ProfilePage = () => {
  const {data,isSuccess} = useFetchData<ProfilePageDataType>(PROFILE_PAGE_URL)

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