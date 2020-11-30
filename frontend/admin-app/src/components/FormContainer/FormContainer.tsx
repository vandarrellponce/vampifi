import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './FormContainer.css'
import { Image } from 'react-bootstrap'
import Animate from '../Hoc/animate'

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className=" justify-content-md-center">
        <Col xs={12} sm={12} md={5}>
          <div
            style={{
              display: 'flex',
              color: 'white',
              fontFamily: 'pacifico',
              fontSize: '88px',
              textShadow: '10px 5px 8px rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            <Animate
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 500, duration: 2000 }}
            >
              <div
                style={{
                  fontSize: '32px',
                  marginBottom: '-20px',
                  marginLeft: '-170px'
                }}
              >
                Welcome to
              </div>
            </Animate>
            <Animate
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ delay: 600, duration: 2000 }}
            >
              Rvampify
            </Animate>
          </div>
        </Col>
        <Col xs={12} sm={12} md={5}>
          <Animate
            from={{ opacity: 0, marginRight: -500, marginLeft: 500 }}
            to={{ opacity: 1, marginRight: 0, marginLeft: 0 }}
            config={{ duration: 300 }}
          >
            <div className="formcontainer__card">{children}</div>
          </Animate>
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
