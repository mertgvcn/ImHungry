import React from 'react'
//css
import './styles/CartAlert.css'

type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
    msg: string
}

const CartAlert = (props: propsType) => {
  return props.trigger ? (
    <div className='cart-alert-wrapper'>
        <span>{props.msg}</span>
    </div>
  ) : null
}

export default CartAlert