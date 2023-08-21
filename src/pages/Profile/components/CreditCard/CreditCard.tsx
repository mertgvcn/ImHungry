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



const CreditCard = () => {

    //Context
    const { toggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Credit Cards
    const [creditCards, setCreditCards] = useState<Array<CCType>>([])

    //Add Card State
    const [addCardStatus, setAddCardStatus] = useState<boolean>(false);

    const fetchUserCards = async () => {
        const data = await getCC(_currentUserID)
        setCreditCards(data)
    }

    useEffect(() => {
        fetchUserCards()
    }, [toggle])

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