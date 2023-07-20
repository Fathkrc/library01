import React from 'react';
import 'bootstrap';
import './App.css';
import MyNavbar from './layouts/NavbarAndFooter/navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomaPage } from './layouts/HomePage/HomaPage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaconfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/shelfpage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';


// console.log(oktaAuth);
export const App = () => {
  const oktaAuth = new OktaAuth(oktaconfig);

  const customAuthHandler = () => {
    history.push('/login');
  }
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {

    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
            <Route path='/reviewlist/:bookId'>
              <ReviewListPage />
            </Route>
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>
            <Route path='/login'
              render={() => <LoginWidget config={oktaconfig} />
              }
            />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path='/shelf'>
              <ShelfPage />
            </SecureRoute>
            <SecureRoute path='/messages'>
              <MessagesPage/>
            </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}


