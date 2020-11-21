import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import './Home.css'

const Home = () => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={3} className="home__sidebar">
            Sidebar
          </Col>
          <Col md={9} className="home__container">
            Container
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Home
