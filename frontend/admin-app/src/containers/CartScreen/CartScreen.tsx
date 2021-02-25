import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from '../../components/Card/Card'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import './CartScreen.css'
import { useSelector } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'

const CartScreen = (props) => {
  const { cartItems } = useSelector((state) => state.cart)
  return (
    <ClientLayout>
      <div className="cartscreen__main">
        <Row>
          <Col md={8}>
            <Card headerLeft="My Cart" headerRight={<div>Deliver to</div>}>
              {cartItems.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
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
