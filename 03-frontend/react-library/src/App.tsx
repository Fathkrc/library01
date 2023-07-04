import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import 'bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import './App.css';
import MyNavbar from './layouts/NavbarAndFooter/navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomaPage } from './layouts/HomePage/HomaPage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';


export const App=()=> {
  return (
    <div>
      <MyNavbar />
      {/* <HomaPage/> */}
      <SearchBooksPage/>
      <Footer/>
    </div>
  );
}


