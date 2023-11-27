import { useContext } from 'react'
import { ChangeContext } from '../../../../context/ChangeContext'
//helpers
import { DeleteCreditCardByID } from '../../../../setup/API/cc_api'
//type
import { CreditCardViewModel } from '../../../../models/ViewModels/CreditCardViewModel'
//css
import './styles/CreditCardCard.css'

type CreditCardCardType = {
  data: CreditCardViewModel
}

const CreditCardCard = ({ data: { Id, Number, HolderName, ExpirationDate, CVV } }: CreditCardCardType) => {
  const { creditCardToggle, setCreditCardToggle } = useContext(ChangeContext)

  const deleteCard = async () => {
    try {
      await DeleteCreditCardByID(Id);
      setCreditCardToggle(!creditCardToggle)
  } catch (error) {
      console.log(error)
  }
  }

  const hideName = () => {
    let hiddenName = ""
    const nameArray = HolderName.split(" ")

    for (let i = 0; i < nameArray.length; i++) {
      for (let j = 0; j < nameArray[i].length; j++) {
        if (j == 0) {
          hiddenName += nameArray[i].charAt(0).toUpperCase()
        }
        else {
          hiddenName += "*"
        }
      }

      hiddenName += " "
    }

    return <p>{hiddenName}</p>
  }

  return (
    <div className='credit-card-card-wrapper'>
      <div className='delete-card'>
        <i className="fa-solid fa-circle-minus" onClick={deleteCard}></i>
      </div>

      <div className='card-number'>
        <i className="fa-solid fa-microchip" style={{ marginRight: 2, marginLeft: 4 }}></i>
        <p>{Number.slice(0, 4)} **** **** {Number.slice(15, 19)}</p>
      </div>

      <div className='cardholder-name'>
        {hideName()}
      </div>

      <div className='date-cvv'>
        <p>{ExpirationDate}</p>
        <p>{CVV}</p>
      </div>
    </div>
  )
}

export default CreditCardCard