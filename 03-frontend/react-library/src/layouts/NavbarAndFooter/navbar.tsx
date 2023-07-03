import React from 'react'
import { Button, Navbar } from 'react-bootstrap'

const MyNavbar = () => {
    return (
        <Navbar expand='lg' className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <Navbar.Brand>
                    Furkir Library
                </Navbar.Brand>
                <Button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls='navbarNavDropDown'
                    aria-label='Toggle Navigation'
                    aria-expanded='false'
                ><span className='navbar-toggler-icon'></span>
                </Button>
                <Navbar.Collapse className='navbar-collapse'
                    id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <a href='#' className='nav-link'> Home</a>
                        </li>
                        <li className='nav-item'>
                            <a href='#' className='nav-link'> Search Books</a>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <a type='button' className='btn btn-outline-light'> Sign in</a>
                        </li>
                    </ul></Navbar.Collapse>



            </div>
        </Navbar>
    )
}

export default MyNavbar;