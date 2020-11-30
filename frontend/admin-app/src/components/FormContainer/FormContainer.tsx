import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './FormContainer.css'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className=" justify-content-md-center">
        <Col xs={12} md={5}>
          <div className="formcontainer__card">{children}</div>
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
