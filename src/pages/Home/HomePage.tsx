import React from 'react'
//COMPONENTS
import Navbar from "../../components/Navbar"
import Restaurants from './components/Restaurants'
//CSS
import './styles/HomePage.css'
import { useParams } from 'react-router-dom'


const HomePage = () => {
  const params = useParams();
  const currentUser = params.user

  return (
    <div className='home-page-background'>
      <Navbar currentUser={currentUser}/>
      <Restaurants />
    </div>

  )
}

export default HomePage