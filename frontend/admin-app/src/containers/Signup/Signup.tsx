import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button, Col, Row } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'

const Signup = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(firstname, lastname, email, password)
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }

  return (
    <Layout>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="container" onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Input
                  value={firstname}
                  onChange={setFirstname}
                  label="First Name"
                  type="text"
                  placeholder="Enter First Name"
                  required={true}
                />
              </Col>
              <Col md={6}>
                <Input
                  value={lastname}
                  onChange={setLastname}
                  label="Last Name"
                  type="text"
                  placeholder="Enter Last Name"
                  required={true}
                />
              </Col>
            </Row>

            <Input
              value={email}
              onChange={setEmail}
              label="Email Address"
              type="email"
              placeholder="Enter Email Address"
              required={true}
            />

            <Input
              value={password}
              onChange={setPassword}
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
