import React from 'react'
import { PaymentContextProvider } from '../../context/PaymentContext'
//css
import './PaymentPage.css'
//components
import CurrentLocation from '../../components/Shared/CurrentLocation'
import RegisteredCC from '../../components/Shared/RegisteredCC'
import Order from './components/Order'

const PaymentPage = () => {


    return (
        <PaymentContextProvider>
                <div className='layout'>
                    <div className='row'>
                        <div className='col'>
                            <RegisteredCC />
                        </div>

                        <div className="col">
                            <CurrentLocation width='90' />
                            <Order/>
                        </div>
                    </div>
                </div>
        </PaymentContextProvider>
    )
}

export default PaymentPage