import React from 'react'
import { ChangeContextProvider } from '../../context/ChangeContext'
//css
import './PaymentPage.css'
//components
import CurrentLocation from '../Home/components/CurrentLocation'
import RegisteredCC from './components/RegisteredCC'

const PaymentPage = () => {


    return (
        <ChangeContextProvider>
            <div className='layout'>
                <div className='row'>
                    <div className='col'>
                        <RegisteredCC/>
                    </div>

                    <div className="col">
                        <CurrentLocation width='90' />
                    </div>
                </div>
            </div>
        </ChangeContextProvider>
    )
}

export default PaymentPage