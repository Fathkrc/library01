import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const LibraryServices = () => {
  return (
      <Container className='my-5'>
          <Row className='p-4 align-items-center border shadow-lg'>
              <Col className='col-lg-7 p-3'>
                  <h1 className='display-4 fw-bold'>
                      Can't find what you are looking for?
                  </h1>
                  <p className='lead'>
                      If you can not find what are you looking for, send our library admin's a personel message!
                  </p>
                  <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                      <a href="#" className='btn main-color btn-lg text-white'>
                          Sign up
                      </a>
                  </div>
              </Col>
              <div className='col-lg-4 offset-lg shadow-lg lost-image'></div>
          </Row>
          
    </Container>
  )
}
