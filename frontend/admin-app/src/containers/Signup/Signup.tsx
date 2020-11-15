import React from 'react'
import { Form } from 'react-bootstrap'
import { Button, Col, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'

const Signup = () => {
  return (
    <Layout>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="container">
            <Row>
              <Col md={6}>
                <Input
                  value=""
                  onChange={() => {}}
                  label="First Name"
                  type="text"
                  placeholder="Enter First Name"
                  required={true}
                />
              </Col>
              <Col md={6}>
                <Input
                  value=""
                  onChange={() => {}}
                  label="Last Name"
                  type="text"
                  placeholder="Enter Last Name"
                  required={true}
                />
              </Col>
            </Row>

            <Input
              value=""
              onChange={() => {}}
              label="Email Address"
              type="email"
              placeholder="Enter Email Address"
              required={true}
            />

            <Input
              value=""
              onChange={() => {}}
              label="Password"
              type="password"
              placeholder="Enter Password"
              required={true}
            />
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}

export default Signup
