import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51NWyUYDFs15HHIHOFzhxUeRlT0Fl1EVAa40RC7KX5kYZpHDM5MxRb2FYOXBdseVtLMjkvcSaA4xY5m3Tg4o6hYWB00OKSpSg1W');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter >
);

