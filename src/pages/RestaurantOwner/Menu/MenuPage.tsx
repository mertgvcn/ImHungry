import React, { useEffect, useState } from 'react'
//css
import './MenuPage.css'
import { GetMenu } from '../../../setup/API/RestaurantManagementAPIs/menu_api'
import MenuManagement from './components/MenuManagement'
import CategoryManagement from './components/CategoryManagement'
import { ItemViewModel } from '../../../models/ViewModels/ItemViewModel'

const MenuPage = () => {
  const [data, setData] = useState<ItemViewModel[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response: any = await GetMenu()
    setData(response)
  }

  console.log(data)

  return data.length>0 ? 
  (
    <div className='menu-page-container'>
      <MenuManagement menu={data}/>
      <CategoryManagement />
    </div>
  ) 
  :
  (
    <>Loading...</>
  ) 
}

export default MenuPage