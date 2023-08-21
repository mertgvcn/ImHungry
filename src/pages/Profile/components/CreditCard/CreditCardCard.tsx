import React, { useContext } from 'react'
import { ChangeContext } from '../../../../context/ChangeContext'
import { deleteCC } from '../../../../setup/API/cc_api'
//type
import { CCCardType } from '../../../../types/CCType'
//css
import './styles/CreditCardCard.css'

const CreditCardCard = ({ data: { ccID, ccNo, ccName, expirationDate, cvv } }: CCCardType) => {
  const { toggle, setToggle } = useContext(ChangeContext)

  const deleteCard = async () => {
    try {
      await deleteCC(ccID);
      setToggle(!toggle)
  } catch (error) {
      console.log(error)
  }
  }

  const hideName = () => {
    debugger;
    let hiddenName = ""
    const nameArray = ccName.split(" ")

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
        <p>{ccNo.slice(0, 4)} **** **** {ccNo.slice(15, 19)}</p>
      </div>

      <div className='cardholder-name'>
        {hideName()}
      </div>

      <div className='date-cvv'>
        <p>{expirationDate}</p>
        <p>{cvv}</p>
      </div>
    </div>
  )
}

export default CreditCardCard