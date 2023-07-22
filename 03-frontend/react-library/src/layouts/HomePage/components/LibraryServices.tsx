import { useOktaAuth } from '@okta/okta-react'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const LibraryServices = () => {

    const { authState } = useOktaAuth();
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
                      {authState?.isAuthenticated ?
                          <Link type='button' className='btn main-color btn-lg px-4 me-md-2 fw-bold text-white btn-outline-info' to='/messages'>
                              Library Services
                          </Link>  
                          :
                          <Link to="/login" className='btn main-color btn-outline-info text-white'>
                          Sign up
                      </Link>
                    }
                      
                  </div>
              </Col>
              <div className='col-lg-4 offset-lg shadow-lg lost-image'></div>
          </Row>
          
    </Container>
  )
}
