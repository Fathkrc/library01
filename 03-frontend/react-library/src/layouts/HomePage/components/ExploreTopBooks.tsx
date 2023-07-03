import React from 'react'
import { Button, Container } from 'react-bootstrap'

export const ExploreTopBooks = () => {
  return (
      <div className='p-5 mb-4 bg-dark header'>
          <Container fluid className='py-5 
           text-white
           d-flex
           justify-content-center
           align-items-center'>
              <div >
                  <h1 className='display-5 fw-bold'> Find your next adventure</h1>
                  <p className='col-md-8 fs-4'> Where would you like to go next? </p>
          <a type='button'
            className='btn main-color btn-lg text-white'
            href='#'>
            Explore Top Books
          </a>
              </div>
         </Container>
    </div>
  )
}

