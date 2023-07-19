import React from 'react'
//CSS
import "./styles/MainPage.css"
//COMPONENTS
import Navbar from '../../components/Navbar'
import Title from './components/Title'

const MainPage = () => {
  return (
    <div className='main-background'>
      <Navbar/>
      <Title/>
    </div>  
  )
}

export default MainPage