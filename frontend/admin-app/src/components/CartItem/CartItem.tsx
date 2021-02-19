import React from 'react'
import { Col, Row } from 'react-bootstrap'
import generatePublicUrl from '../../helpers/generatePublicUrl'
import './CartItem.css'

type myProps = {
  item: any
  index: any
}

const CartItem: React.FC<myProps> = ({ item, index }) => {
  return (
    <Row key={index} className="cartitem__items__container">
      <Col md={3} className="cartitem__item__image">
        <img src={generatePublicUrl(item.image)} alt="item" />
        <div className="quantity__container">
          <button className="cartitem__button">-</button>{' '}
          <button className="cartitem__button__center">{item.qty}</button>{' '}
          <button className="cartitem__button">+</button>
        </div>
      </Col>
      <Col md={9}>
        <div>{item.name}</div>
        <div>{item.price}</div>
      </Col>
    </Row>
  )
}

export default CartItem
