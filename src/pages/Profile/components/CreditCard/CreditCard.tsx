import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { Decrypt } from '../../../../setup/Crypto/Cryption'
import { getCC } from '../../../../setup/API/cc_api'
//type
import { CCType } from '../../../../types/CCType'
//css
import './styles/CreditCard.css'
//components
import CreditCardCard from './CreditCardCard'
import CreditCardAdd from './CreditCardAdd'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_APIKEY



const CreditCard = () => {

    //Context
    const { creditCardToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Credit Cards
    const [creditCards, setCreditCards] = useState<Array<CCType>>([])

    //Add Card State
    const [addCardStatus, setAddCardStatus] = useState<boolean>(false);


    //fetch cc
    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        const fetchCC = async (): Promise<void> => {
            await axios.get('https://localhost:7181/api/CreditCard/getCC', {
                cancelToken: cancelToken.token,
                params: {
                    userID: _currentUserID
                },
                headers: {
                    'x-api-key': API_KEY
                }
            }).then((res) => {
                setCreditCards(res.data)
            }).catch((err) => {})

            return new Promise((resolve) => resolve())
        }

        const syncFetch = async () => {
            await fetchCC()
        }

        syncFetch()

        return () => {
            cancelToken.cancel()
        }
    }, [creditCardToggle])

    return (
        <>
            <div className='credit-card-wrapper'>
                <p>Credit Cards</p>

                <div className='credit-cards'>
                    {creditCards.map((card, idx) => (
                        <CreditCardCard data={card} key={idx} />
                    ))}

                    <div className="add-card" onClick={() => setAddCardStatus(true)}>
                        +
                    </div>
                </div>

            </div>

            {addCardStatus && 
            <div className="add-card-background">
                <CreditCardAdd trigger={addCardStatus} setTrigger={setAddCardStatus} width='540px'/>
            </div>}
        </>

    )
}

export default CreditCard