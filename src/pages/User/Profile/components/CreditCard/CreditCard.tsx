import { useContext, useState } from 'react'
import { ChangeContext } from '../../../../../context/ChangeContext'
//exported functions
import { GetUserCreditCards } from '../../../../../setup/API/UserAPIs/cc_api'
import useDidMountUpdate from '../../../../../hooks/useDidMountUpdate'
//type
import { CreditCardViewModel } from '../../../../../models/ViewModels/CreditCardViewModel'
//css
import './styles/CreditCard.css'
//components
import CreditCardCard from './CreditCardCard'
import CreditCardAdd from './CreditCardAdd'


type CreditCardType = {
    creditCards: CreditCardViewModel[]
}


const CreditCard = (props: CreditCardType) => {
    //Context
    const { creditCardToggle } = useContext(ChangeContext)

    //Credit Cards
    const [creditCards, setCreditCards] = useState<CreditCardViewModel[]>(props.creditCards)

    //Add Card State
    const [addCardStatus, setAddCardStatus] = useState<boolean>(false);

    //Live Update if change occurs
    const fetchCreditCards = async () => {
        const data:any = await GetUserCreditCards()
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