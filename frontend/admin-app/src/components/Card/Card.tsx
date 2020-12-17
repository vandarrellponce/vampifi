import React from 'react'
import './Card.css'

const Card = (props) => {
  return <div className="card__main">{props.children}</div>
}

export default Card
