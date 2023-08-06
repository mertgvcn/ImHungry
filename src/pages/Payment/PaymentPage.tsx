import React from 'react'
//css
import './PaymentPage.css'
//components
import CurrentLocation from '../Home/components/CurrentLocation'
import { ChangeContextProvider } from '../../context/ChangeContext'

const PaymentPage = () => {
    return (
        <ChangeContextProvider>
            <div className='row'>
                <div className='col'>
                    <CurrentLocation width='100'/>
                    <CurrentLocation width='70'/>
                </div>
            </div>
        </ChangeContextProvider>
    )
}

export default PaymentPage