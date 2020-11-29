import React from 'react'
/* import { Col, Container, Row } from 'react-bootstrap' */
import MenuHeader from '../MenuHeader/MenuHeader'

const ClientLayout = (props) => {
  return (
    <div>
      <MenuHeader />
      {/* {props.showSidebar ? (
        <Container fluid>
          <Row>
            <Col md={2}>
              <LayoutSidebar />
            </Col>
            <Col md={10} className="layout__container">
              <Container fluid>{props.children}</Container>
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )} */}
      {props.children}
    </div>
  )
}

export default ClientLayout
