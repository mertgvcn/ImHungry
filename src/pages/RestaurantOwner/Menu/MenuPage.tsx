import React, { useEffect, useState } from 'react'
//css
import './MenuPage.css'
import { GetCategories, GetMenu } from '../../../setup/API/RestaurantManagementAPIs/menu_api'
import MenuManagement from './components/MenuManagement'
import CategoryManagement from './components/CategoryManagement'
import { ItemViewModel } from '../../../models/ViewModels/ItemViewModel'
import { Category } from '../../../models/EntityModels/Category'

const MenuPage = () => {
  const [menu, setMenu] = useState<ItemViewModel[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [didDataFetched, setDidDataFetched] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const menuList: any = await GetMenu()
    setMenu(menuList)

    const categoryList: any = await GetCategories()
    setCategories(categoryList)

    setDidDataFetched(true)
  }

  return didDataFetched ? (
    <div className='menu-page-container'>
      <div className="col">
        <MenuManagement menu={menu} categories={categories} />
      </div>

      <div className="col">
        <CategoryManagement categories={categories}/>
        <CategoryManagement categories={categories}/>
      </div>
    </div>
  )
    :
    (
      <>
        Loading...
      </>
    )
}

export default MenuPage