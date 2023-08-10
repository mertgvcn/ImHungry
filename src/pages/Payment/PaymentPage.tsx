import React from 'react'
import { PaymentContextProvider } from '../../context/PaymentContext'
import { ChangeContextProvider } from '../../context/ChangeContext'
//css
import './PaymentPage.css'
//components
import CurrentLocation from '../Home/components/CurrentLocation'
import RegisteredCC from './components/RegisteredCC'
import Order from './components/Order'

const PaymentPage = () => {


    return (
        <PaymentContextProvider>
            <ChangeContextProvider>
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
            </ChangeContextProvider>
        </PaymentContextProvider>
    )
}

export default PaymentPage