import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux'

import { Helmet } from 'react-helmet'
import FormContainer from '../../components/FormContainer/FormContainer'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import registerUser from '../../store/actions/user.register'
import Input from '../../components/UI/Input/Input'
import Layout from '../../components/Layout/Layout'

const Signup = (props) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [formError, setFormError] = useState(null)
  const { loading, registerError } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== rePassword) {
      return setFormError('Password does not match')
    }

    setFormError(null)
    dispatch(registerUser(email, password, firstname, lastname))
  }

  return (
    <Layout>
      <div
        className="py-3"
        style={{
          background:
            'linear-gradient(23deg, rgba(85,212,255,1) 0%, rgba(255,199,103,1) 100%)',
          height: '100vh'
        }}
      >
        <FormContainer>
          <Helmet>
            <title>Kumbatea! | Register</title>
            <meta
              name="description"
              content="We sell the best milk tea in town"
            />
          </Helmet>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h1
              style={{
                fontFamily: 'Pacifico',
                fontWeight: 'bold'
              }}
            >
              Create An Account
            </h1>
          </div>
          {registerError && <Message children={registerError} variant="info" />}
          {formError && <Message children={formError} variant="danger" />}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                {' '}
                <Input
                  label="First Name"
                  type="text"
                  value={firstname}
                  placeholder="Enter first name"
                  onChange={(e) => setFirstname(e.target.value)}
                  required={true}
                />
              </Col>
              <Col md={6}>
                <Input
                  label="Last Name"
                  type="text"
                  value={lastname}
                  placeholder="Enter last name"
                  onChange={(e) => setLastname(e.target.value)}
                  required={true}
                />
              </Col>
            </Row>

            <Input
              label="Email"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />

            <Input
              label="Re-Enter Password"
              type="password"
              value={rePassword}
              placeholder="Re-enter password"
              onChange={setRePassword}
              required={true}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="dark">
                Submit
              </Button>
            </div>
          </Form>
          <Row className="py-3">
            <Col>
              Have already an account? <Link to={`/signin`}>Login</Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </Layout>
  )
}

export default Signup
