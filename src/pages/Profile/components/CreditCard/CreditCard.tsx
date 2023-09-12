import { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { ChangeContext } from '../../../../context/ChangeContext'
//exported functions
import { Decrypt } from '../../../../setup/Crypto/Cryption'
import { getCC } from '../../../../setup/API/cc_api'
import useDidMountUpdate from '../../../../hooks/useDidMountUpdate'
//type
import { CreditCardDataType, UserCreditCardsType } from '../../../../types/CreditCardDataType'
//css
import './styles/CreditCard.css'
//components
import CreditCardCard from './CreditCardCard'
import CreditCardAdd from './CreditCardAdd'


type CreditCardType = {
    creditCard: CreditCardDataType
}


const CreditCard = (props: CreditCardType) => {
    //Context
    const { creditCardToggle } = useContext(ChangeContext)
    const { currentUserID } = useContext(UserContext)
    const _currentUserID = Decrypt(currentUserID)

    //Credit Cards
    const [creditCards, setCreditCards] = useState<UserCreditCardsType[]>(props.creditCard.userCreditCards)

    //Add Card State
    const [addCardStatus, setAddCardStatus] = useState<boolean>(false);

    //Live Update if change occurs
    const fetchCreditCards = async () => {
        const data:any = await getCC(_currentUserID)
        setCreditCards(data)
    }

    useDidMountUpdate(() => {
        fetchCreditCards()
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