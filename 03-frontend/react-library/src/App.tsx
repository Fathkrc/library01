import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import 'bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import './App.css';
import MyNavbar from './layouts/NavbarAndFooter/navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomaPage } from './layouts/HomePage/HomaPage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';


export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <MyNavbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomaPage />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}


