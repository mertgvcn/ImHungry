//components
import Navbar from './components/Shared/Navbar'
import RouterManager from './components/Routers/RouterManager'
import { BrowserRouter } from 'react-router-dom'


type LayoutPropType = {
    isLogin: boolean
}


const Layout = ({ isLogin }: LayoutPropType) => {

    return (
        <BrowserRouter>
            <Navbar isLogin={isLogin} />
            <RouterManager isLogin={isLogin} />
        </BrowserRouter>
    )
}

export default Layout