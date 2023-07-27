import { useOktaAuth } from '@okta/okta-react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PaymentInfoRequest from '../../models/PaymentInfoRequest';
import { SpinnerLoading } from '../utils/SpinnerLoading';

const PaymentPage = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [fees, setFees] = useState(0);
    const [isLoadingFees, setIsLoadingFees] = useState(true);

    useEffect(() => {
        const fetchFees = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/payments/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json'
                    }
                };
                const paymentResponse = await fetch(url, requestOptions);
                if (!paymentResponse) {
                    throw new Error('Something went wrong');
                }
                const paymentResponseJson = await paymentResponse.json();
                setFees(paymentResponseJson.amount);
                setIsLoadingFees(false);
            }
        }
        fetchFees().catch((err: any) => {
            setHttpError(err.message);
            setIsLoadingFees(false);
        })
    }, [authState]);

    const elements = useElements();
    const stripe = useStripe();
    async function checkout() {
        if (!stripe || !elements || !elements.getElement(CardElement)) {
            return;
        }
        setSubmitDisabled(true);

        let paymentInfo = new PaymentInfoRequest(Math.round(fees * 100), 'USD', authState?.accessToken?.claims.sub);
        const url = `https://localhost:8443/api/payment/secure/payment-intent`;
        const requestOption = {
            method: 'POST',
            headers: {
                Authrorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentInfo)
        };
        const stripeResponse = await fetch(url, requestOption);
        // console.log(await stripeResponse.json());
        if (!stripeResponse.ok) {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error('WRONG');
        }

        const stripeResponseJson = await stripeResponse.json();
        console.log(stripeResponseJson);
        stripe.confirmCardPayment(stripeResponseJson.client_secret,
            {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        email: authState?.accessToken?.claims.sub
                    }
                }
            }, { handleActions: false }
        ).then(async function (result: any) {
            if (result.error) {
                setSubmitDisabled(false);
                alert('There was an error');
            } else {
                const url = `https://localhost:8443/api/payment/secure/payment-complete`;
                const requestOption = {
                    method: 'PUT',
                    headers: {
                        Authrorization : `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type' : 'application/json'
                    }
                };
                const stripeResponse = await fetch(url, requestOption);
                if (!stripeResponse.ok) {
                    setHttpError(true);
                    setSubmitDisabled(false);
                    throw new Error('gammaklar yandi');
                }
                setFees(0);
                setSubmitDisabled(false);
            }
        })
        setHttpError(false);
    }
    if (isLoadingFees) {
        return (
            <SpinnerLoading />
        )
    }
    if (httpError) {
        <div className='mt-5'>
            <p>{httpError}</p>
        </div>
    }


    return (
        <Container>
            {fees > 0 &&
                <div className='card mt-3'>
                    <h5>Fees Pending:  <span className='text-danger'>${fees}</span></h5>
                    <div className='card-body'>
                        <h5 className='card-title mb-3'> Credit Card</h5>
                        <CardElement id='card-element' />
                        <button disabled={submitDisabled}
                            type='button'
                            className='btn btn-md main-color text-white mt-3'
                            onClick={checkout}>
                            Pay Fees
                        </button>
                    </div>
                </div>
            }

            {fees === 0 &&
                <div className='mt-3'>
                    <h5>You have no Fees</h5>
                    <Link type='button' className='btn main-color btn-outline-info text-white' to='search'>
                        Explore top books
                    </Link>
                </div>
            }
            {submitDisabled &&
                <SpinnerLoading />
            }
        </Container>
    )
}

export default PaymentPage;