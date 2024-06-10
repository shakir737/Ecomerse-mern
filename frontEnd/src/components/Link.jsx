import React from 'react'
import { Link } from 'react-router-dom'
const LinkItem = ({text,linkText,forwardTo}) => {
  return (
    <>
      {text}
      <Link to={forwardTo} >
        {linkText}
     </Link>
    </>
  )
}

export default LinkItem
