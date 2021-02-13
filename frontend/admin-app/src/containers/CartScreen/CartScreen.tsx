import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from '../../components/Card/Card'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import './CartScreen.css'
import { useSelector, useDispatch } from 'react-redux'
import generatePublicUrl from '../../helpers/generatePublicUrl'

const CartScreen = (props) => {
  const { cartItems } = useSelector((state) => state.cart)
  return (
    <ClientLayout>
      <div className="cartscreen__main">
        <Row>
          <Col md={8}>
            <Card headerLeft="My Cart" headerRight={<div>Deliver to</div>}>
              <div className="cartscreen__row">
                <div className="cartscreen__product__container">
                  <div className="cartscreen__productDetail">
                    {cartItems.map((item, i) => (
                      <Row key={i} className="cartscreen__items__container">
                        <Col md={3} className="cartscreen__item__image">
                          <img src={generatePublicUrl(item.image)} alt="item" />
                          <div className="quantity__container">
                            <button className="cartscreen__button">-</button>{' '}
                            <button className="cartscreen__button__center">
                              {item.qty}
                            </button>{' '}
                            <button className="cartscreen__button">+</button>
                          </div>
                        </Col>
                        <Col md={9}>
                          <div>{item.name}</div>
                          <div>{item.price}</div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card headerLeft="Total">Price</Card>
          </Col>
        </Row>
      </div>
    </ClientLayout>
  )
}

export default CartScreen
