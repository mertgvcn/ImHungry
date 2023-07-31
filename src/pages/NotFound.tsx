import React from 'react'

type propsType = {
  msg: string
}

const NotFound = (props:propsType) => {
  return (
    <h1>{props.msg}</h1>
  )
}

export default NotFound