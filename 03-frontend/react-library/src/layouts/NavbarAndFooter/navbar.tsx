import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../utils/SpinnerLoading';

const MyNavbar = () => {

    const { oktaAuth, authState } = useOktaAuth();
    if (!authState) {
        return <SpinnerLoading />
    }

    const handleLogout = async () => oktaAuth.signOut();
    console.log(authState);
    return (
        <Navbar expand='lg' className=' navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <Navbar.Brand className="user-select-none">
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
                            <NavLink to='/home' className='nav-link'> Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/search' className='nav-link'> Search Books</NavLink>
                        </li>
                        {authState.isAuthenticated &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/shelf'>
                                    Shelf
                                </NavLink>
                        </li>
                        }
                    </ul>
                    <ul className='navbar-nav ms-auto'>

                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                <Link type='button' className='btn btn-outline-light' to='/login'> Sign in</Link>
                            </li>
                            :
                            <li className='nav-item m-1'>
                                <Button type='button' className=' btn-outline-light main-color' onClick={handleLogout}> Logout</Button>
                            </li>
                        }

                    </ul></Navbar.Collapse>



            </div>
        </Navbar>
    )
}

export default MyNavbar;