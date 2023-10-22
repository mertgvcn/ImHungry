import React, { useState } from 'react'
import './styles/ConfirmPopUp.css'

type ConfirmPopUpPropsType = {
    confirmProperties: {
        isOpen: boolean;
        msg: string;
    },
    setConfirmProperties: React.Dispatch<React.SetStateAction<{
        isOpen: boolean;
        msg: string;
    }>>,
    confirmFunction: any
}

const ConfirmPopUp = (props: ConfirmPopUpPropsType) => {

    const closePopUp = () => {
        props.setConfirmProperties({
            isOpen: false,
            msg: ""
        })
    }

    const handleConfirm = async () => {
        await props.confirmFunction()
        closePopUp()
    }

    return props.confirmProperties.isOpen ? (
        <div className='confirm-pop-up-background'>
            <div className='confirm-pop-up-wrapper'>
                <div className='message'>
                    <p>{props.confirmProperties.msg}</p>
                </div>

                <div className='buttons'>
                    <button id='cancel' onClick={closePopUp}>Cancel</button>
                    <button id='confirm' onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    ) : null
}

export default ConfirmPopUp