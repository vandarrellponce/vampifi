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
/* import GoogleButton from 'react-google-button' */

const SigninScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { currentUserInfo, loginError } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // HANDLERS
  const submitHandler = async (e) => {
    e.preventDefault()

    setLoading(true)
    await dispatch(loginUser(email, password))
    setLoading(false)
  }
  useEffect(() => {
    if (currentUserInfo) props.history.push('/')
  }, [currentUserInfo, props])

  if (currentUserInfo)
    return (
      <Layout>
        <Loader />
      </Layout>
    )

  return (
    <Layout>
      <div className="py-3">
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
          <h4>ADMIN LOGIN</h4>
          {loginError && <Message children={loginError} variant="info" />}

          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Input
              onChange={setEmail}
              label="Email Address"
              type="text"
              required={true}
              placeholder="Enter Email"
              value={email}
            />

            <Input
              onChange={setPassword}
              label="Password"
              type="password"
              required={true}
              placeholder="Enter password"
              value={password}
            />

            <Button type="submit" variant="secondary" size="sm">
              Submit
            </Button>
          </Form>
          <br />

          {/* 	<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link to={`/register?redirect=${redirect}`}>Register</Link>
				</Col>
			</Row> */}
        </FormContainer>
      </div>
    </Layout>
  )
}

export default SigninScreen
