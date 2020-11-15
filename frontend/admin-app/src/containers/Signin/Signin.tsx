import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'

const Signin = () => {
  return (
    <Layout>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="container">
            <Input
              value=""
              onChange={() => {}}
              label="Email"
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

export default Signin
