import React from 'react'
import { Col, Row } from 'react-bootstrap'
import generatePublicUrl from '../../helpers/generatePublicUrl'
import { useDispatch } from 'react-redux'
import './CartItem.css'
import { alterQuantity } from '../../store/actions/cart.addToCart'

type myProps = {
  item: any
}

const CartItem: React.FC<myProps> = ({ item }) => {
  const dispatch = useDispatch()

  const handlePlusQty = (item) => {
    dispatch(alterQuantity(item.productId, 1))
  }

  const handleMinusQty = (item) => {
    dispatch(alterQuantity(item.productId, -1))
  }
  return (
    <Row className="cartitem__items__container">
      <Col md={3} className="cartitem__item__image">
        <img src={generatePublicUrl(item.image)} alt="item" />
        <div className="quantity__container">
          <button
            className="cartitem__button"
            onClick={(e) => handleMinusQty(item)}
          >
            -
          </button>{' '}
          <button className="cartitem__button__center">{item.qty}</button>{' '}
          <button
            className="cartitem__button"
            onClick={(e) => handlePlusQty(item)}
          >
            +
          </button>
        </div>
      </Col>
      <Col md={6} className="cartitem__item__details">
        <div>
          <div>{item.name}</div>
          <div>{item.price}</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '200px',
            justifyContent: 'space-between'
          }}
        >
          <div className="cartitem__options">
            <strong>SAVE FOR LATER</strong>
          </div>{' '}
          <div className="cartitem__options">
            <strong>REMOVE</strong>
          </div>
        </div>
      </Col>
      <Col md={3} className="cartitem__item__delivery">
        Delivery in 3 to 6 days
      </Col>
    </Row>
  )
}

export default CartItem
