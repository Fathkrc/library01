import { useOktaAuth } from '@okta/okta-react'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const Heroes = () => {

    const { authState } = useOktaAuth();
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'>
                        </div>
                    </div>

                    <Container className='col-4 col-md-4 d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1> What have you been reading?</h1>
                            <p className='lead'>
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you</p>
                            {authState?.isAuthenticated ?
                            <Link type='button' className='btn main-color btn-outline-info text-white' to='search'>Explore top Books</Link>
                            :
                            <Link to="/login" className='btn main-color btn-outline-info text-white'>Sign up</Link>
                            }
                           
                        </div>
                    </Container>
                </div>
                <div className='row g-0'>
                    <Container 
                        className='col-4 col-md-4 d-flex justify-content-center 
                        align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing.
                                We work nonstop to provide the most accurate book selection possible .
                            </p>
                            {authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-outline-info text-white' to='search'>
                                    Explore Top Books</Link>
                                :
                                <Link type='button' className='btn main-color btn-outline-info text-white' to='/login'>
                                Sing up</Link>}
                        </div>

                    </Container>

                    <div className='cal-sm-6 col-md-6'>
                        <div className='col-image-right'>

                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Mobile Heroes */}
            <div className='d-lg-none'>
                <Container>

                </Container>
            </div>
        </div>
    )
}
