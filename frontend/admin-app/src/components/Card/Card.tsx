import React from 'react'
import './Card.css'

type Props = {
  headerLeft?: string
  headerRight?: string
}

const Card: React.FC<Props> = ({ headerLeft, headerRight, children }) => {
  return (
    <div className="card">
      {(headerLeft || headerRight) && (
        <div className="cardHeader">
          {headerLeft && (
            <div
              style={{
                alignSelf: 'center',
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              {headerLeft}
            </div>
          )}
          {headerRight && headerRight}
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
