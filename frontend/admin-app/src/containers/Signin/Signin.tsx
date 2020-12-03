import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'
import loginUser from '../../store/actions/user.login'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
/* import GoogleButton from 'react-google-button' */

const SigninScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { loginError } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // HANDLERS
  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)
    await dispatch(loginUser(email, password))
    setLoading(false)
  }

  return (
    <Layout>
      <div
        className="py-3"
        style={{
          background:
            'linear-gradient(23deg, rgba(85,212,255,1) 0%, rgba(255,199,103,1) 100%)',
          height: '95vh'
        }}
      >
        <FormContainer>
          {/*  <a href="/auth/google" style={{ textDecoration: 'none' }}>
          <GoogleButton
            type="dark"
            style={{ width: '100%', marginTop: '30px', marginBottom: '30px' }}
          />
        </a> */}
          <Helmet>
            <title>Pro Store | Login</title>
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
              Sign In
            </h1>
          </div>
          {loginError && <Message children={loginError} variant="info" />}

          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              type="text"
              required={true}
              placeholder="Enter Email"
              value={email}
            />

            <Input
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              required={true}
              placeholder="Enter password"
              value={password}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="dark">
                Submit
              </Button>
            </div>
          </Form>
          <br />

          <Row className="py-3">
            <Col>
              New Customer? <Link to={`/signup`}>Register</Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </Layout>
  )
}

export default SigninScreen
