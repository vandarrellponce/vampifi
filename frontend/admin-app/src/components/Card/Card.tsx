import React from 'react'
import './Card.css'

type Props = {
  headerLeft?: string
  headerRight?: any
  style?: any
}

const Card: React.FC<Props> = ({
  headerLeft,
  headerRight,
  children,
  style
}) => {
  return (
    <div className="card" style={style}>
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
      <div className="card__body">{children}</div>
    </div>
  )
}

export default Card
