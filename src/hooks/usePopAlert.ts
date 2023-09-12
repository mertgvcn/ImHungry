import { useState } from "react";

export function usePopAlert() {
    const [alertStates, setAlertStates] = useState({
        color: "",
        msg: "",
        isOpen: false
    })
    
    const popAlert = (color: string, msg: string) => {
      setAlertStates({
        color: color,
        msg: msg,
        isOpen: true
      })
  
      setTimeout(() => {
        setAlertStates({
            color: "",
            msg: "",
            isOpen: false
        })
      }, 3000)
    }

    return {alertStates, popAlert}
}