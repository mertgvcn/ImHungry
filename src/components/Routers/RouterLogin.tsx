//router
import { Routes, Route } from "react-router-dom"
//pages
import HomePage from "../../pages/Home/HomePage"
import RestaurantDetailsPage from "../../pages/RestaurantDetails/RestaurantDetailsPage"
import ProfilePage from "../../pages/Profile/ProfilePage"
import PaymentPage from "../../pages/Payment/PaymentPage"



export default function RouterLogin() {
    
    return (
        <>
            <Routes>
                {/*USER*/}
                <Route path="/" element={<HomePage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/restaurant" element={<RestaurantDetailsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </>
    )


}