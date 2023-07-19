import React from 'react'
import "./styles/Alert.css"
import { AlertType } from '../types/AlertType'

const Alert = (props:AlertType) => {
  return (props.isOpen) ? (
    <div className='alert' style={{backgroundColor:props.color}} >
        {props.msg}
    </div>
  ) : null;
}

export default Alert