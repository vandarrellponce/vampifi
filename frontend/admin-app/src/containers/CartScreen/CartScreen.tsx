import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from '../../components/Card/Card'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import './CartScreen.css'
import { useSelector, useDispatch } from 'react-redux'

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
                      <div key={i}>{item.name}</div>
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
