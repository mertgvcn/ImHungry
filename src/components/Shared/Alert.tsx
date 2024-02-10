import React, { useEffect, useState } from 'react'
import "./styles/Alert.css"

export type AlertType = {
  isOpen: boolean,
  color: string,
  msg: string
}

const Alert = (props: AlertType) => {
  const [title, setTitle] = useState<string>("")
  const [icon, setIcon] = useState<string>("")

  useEffect(() => {
    if (props.color === "green") {
      setTitle("Success")
      setIcon("fa-solid fa-circle-check")
    } else if (props.color === "orange") {
      setTitle("Error")
      setIcon("fa-solid fa-circle-exclamation")
    } else {
      setTitle("Warning")
      setIcon("fa-solid fa-triangle-exclamation")
    }
  }, [props.color])

  return (props.isOpen) ? (
    <div className="alert-wrapper">
      <div className='alert' style={{ backgroundColor: props.color }} >
        <p style={{ fontSize: 22, marginBottom: 10 }}><i className={icon} style={{ marginRight: 4 }}></i>{title}</p>
        <p>{props.msg}</p>
      </div>
    </div>
  ) : null;
}

export default Alert