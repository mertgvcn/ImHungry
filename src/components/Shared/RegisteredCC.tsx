import { useContext, useState } from 'react'
import { PaymentContext } from '../../context/PaymentContext'
//exported functions
import { DeleteCreditCardByID, GetUserCreditCards } from '../../setup/API/UserAPIs/cc_api'
//css
import './styles/RegisteredCC.css'
//type
import { CreditCardViewModel } from '../../models/ViewModels/CreditCardViewModel'
//component
import CreditCardAdd from '../../pages/User/Profile/components/CreditCard/CreditCardAdd'


const RegisteredCC = () => {
    //Context
    const { ccID } = useContext(PaymentContext)

    //CC states
    const [userCCs, setUserCCs] = useState<CreditCardViewModel[]>([])
    const [displayedCC, setDisplayedCC] = useState<string>("")
    const [dropDownState, setDropDownState] = useState<boolean>(false)

    //Add cc state
    const [isAddCC, setIsAddCC] = useState<boolean>(false)


    //Fetch credit cards when user clicks
    const fetchCC = async (): Promise<void> => {
        const data: any = await GetUserCreditCards()
        setUserCCs(data)
        return new Promise((resolve) => { resolve() })
    }

    const handleFetchCC = async (isChange: boolean) => {
        if (!dropDownState) { //dropdown açıldığında fetchleyecek, state geriden geldiği için false durumunu aldık
            await fetchCC()
        }
        else if (isChange) {
            await fetchCC()
            setDropDownState(true)
        }
    }


    //Hide name on card for security
    const hideName = (cardHolderName: string) => {
        let hiddenName = ""
        const nameArray = cardHolderName.split(" ")

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

        return hiddenName
    }

    return (
        <>
            <div className='registered-cc-wrapper'>

                {/* Title */}
                <div className="registered-cc-title-wrapper">
                    <p id='registered-cc-title'>Registered Cards</p>
                </div>

                {/* BODY */}
                <div className="cc-selection" onClick={() => {
                    setDropDownState(!dropDownState)
                    handleFetchCC(false)
                }}>
                    <i className="fa-solid fa-credit-card" style={{ marginRight: 5 }}></i>
                    <input id="current-cc" type="text" placeholder='Select Credit Card'
                        value={displayedCC} readOnly={true} />
                    <i className="fa-solid fa-chevron-down"></i>
                </div>

                {/* DROP DOWN SELECTION */}
                {dropDownState && (<div className='cc-list'>
                    <ul>
                        {/* cc list */}
                        {userCCs.map((cc, idx) => (
                            <li key={idx}>

                                {/* CC Info */}
                                <div className='cc-info' onClick={() => {
                                    ccID.current = cc.Id
                                    setDisplayedCC(`${cc.Number.slice(0, 4)} **** **** ${cc.Number.slice(15, 19)}`)
                                    setDropDownState(false)
                                    setIsAddCC(false)
                                }}>
                                    <i className="fa-solid fa-credit-card" style={{ marginRight: 5 }}></i>
                                    {cc.Number.slice(0, 4)} **** **** {cc.Number.slice(15, 19) + " - " + hideName(cc.HolderName)}
                                </div>

                                {/* Delete CC */}
                                <div className='cc-delete' onClick={async () => {
                                    await DeleteCreditCardByID(cc.Id)
                                    setDisplayedCC("")
                                    setDropDownState(!dropDownState)
                                    handleFetchCC(true)
                                }}>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* add new cc */}
                    <div className='add-new-card' onClick={() => {
                        setIsAddCC(true)
                        setDropDownState(false)
                    }}>
                        <i className="fa-regular fa-square-plus" style={{ marginLeft: 2, marginRight: 8 }}></i>
                        <p>Add new credit card...</p>
                    </div>
                </div>)}
            </div>

            <CreditCardAdd trigger={isAddCC} setTrigger={setIsAddCC} width='90%' />
        </>

    )
}

export default RegisteredCC