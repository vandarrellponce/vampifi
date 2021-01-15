import React from 'react'
import Card from '../../components/Card/Card'
import ClientLayout from '../../components/LayoutClient/ClientLayout'
import './CartScreen.css'

const CartScreen = (props) => {
  return (
    <ClientLayout>
      <div className=" cartscreen__main" style={{ alignItems: 'flex-start' }}>
        <Card
          headerLeft="My Cart"
          headerRight={<div>Deliver to</div>}
          style={{
            width: 'calc(100% - 400px)',
            overflow: 'hidden'
          }}
        >
          <div className="cartscreen__row">
            <div className="cartscreen__product__container">
              <div className="cartscreen__productDetail">
                <div>Product Name</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ClientLayout>
  )
}

export default CartScreen
