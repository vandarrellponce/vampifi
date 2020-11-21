import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Toolbar from '../Header/Toolbar/Toolbar'
import './Layout.css'

const Layout = (props) => {
  return (
    <div>
      <Toolbar />
      {props.showSidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="layout__sidebar">
              Sidebar
            </Col>
            <Col md={10} className="layout__container">
              <Container fluid>{props.children}</Container>
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </div>
  )
}

export default Layout
