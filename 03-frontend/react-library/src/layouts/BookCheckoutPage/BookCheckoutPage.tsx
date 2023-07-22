import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import BookModel from '../../models/BookModel'
import ReviewModel from '../../models/ReviewModel';
import ReviewRequestModel from '../../models/ReviewRequestModel';
import { SpinnerLoading } from '../utils/SpinnerLoading';
import { StarsReview } from '../utils/StarsReview';
import { CheckoutAndReviewBox } from './CheckoutAndReviewBox';
import { LatestReviews } from './LastestReview';

export const BookCheckoutPage = () => {
    const { authState } = useOktaAuth();


    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    //Loans Count State

    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);
    // is book Checked out

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingBookCheckedout, setIsLoadingBookCheckedout] = useState(true);



    const bookId = (window.location.pathname).split('/')[2];
    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`


            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            }

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut])

    // Review UseEffect

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReview: ReviewModel[] = [];

            let starReviews: number = 0;

            for (const key in responseData) {
                loadedReview.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription

                })
                starReviews = starReviews + responseData[key].rating;
                if (loadedReview) {
                    const round = (Math.round((starReviews / loadedReview.length) * 2) / 2).toFixed(1);
                    setTotalStars(Number(round));
                }
                setReviews(loadedReview);
                setIsLoadingReview(false);


            }
        }
        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState?.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/reviews/secure/user/book/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error("Something went wrong")
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);

        }
        fetchUserReviewBook().catch((err) => {
            setIsLoadingUserReview(false);
            setHttpError(err.message);
        })
    })
    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);

    useEffect(() => {
        const fetchUserCheckedOutBook = async () => {

            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/books/secure/ischeckedout/byuser/?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const bookCheckedOut = await fetch(url, requestOptions);
                if (!bookCheckedOut.ok) {
                    throw new Error('Something went wrong');
                }
                const bookCheckedOutJson = await bookCheckedOut.json();
                setIsCheckedOut(bookCheckedOutJson);
            }
            setIsLoadingBookCheckedout(false);
        }
        fetchUserCheckedOutBook().catch((error: any) => {
            setIsLoadingBookCheckedout(false);
            setHttpError(error.message);
        })

    }, [authState]);

    if (isLoading && isLoadingReview && isLoadingCurrentLoansCount && isLoadingBookCheckedout && isLoadingUserReview) {
        return (
            <SpinnerLoading />
        )
    }
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutBook() {
        const url = `${process.env.REACT_APP_API}/books/secure/checkout/?bookId=${book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong');
        }
        setIsCheckedOut(true);
    }

    const submitReview = async (starInput: number, reviewDescription: string) => {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }
        const reviewRequestmodel = new ReviewRequestModel(starInput, bookId, reviewDescription);
        const url = `${process.env.REACT_APP_API}/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestmodel)
        }
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong');
        }
        setIsReviewLeft(true);

    }


return (
    <div>
        <Container className='d-none d-lg-block' >
            <div className='row mt-5'>
                <div className='col-sm-2 col-md-2'>
                    {
                        book?.img ?
                            <img src={book.img} width='226' height='349' alt="Book" />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')}
                                width='226' height='349' alt="Book" />
                    }
                </div>
                <div className='col-4 col-md-4 container'>
                    <div className='ml-2'>
                        <h2 >{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'> {book?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book}
                    mobile={false}
                    currentLoansCount={currentLoansCount}
                    isAuthotenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook}
                    isReviewLeft={isReviewLeft}
                    submitReview={submitReview}
                />
            </div>
            <hr />
            <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
        </Container>
        <Container className='d-lg-none mt-5'>
            <div className='d-flex justify-content-center align-items-center'>
                {
                    book?.img ?
                        <img src={book.img} width='226' height='349' alt="Book" />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')}
                            width='226' height='349' alt="Book" />
                }
            </div>
            <div className='mt-4'>
                <div className='ml-2'>
                    <h2>{book?.title}</h2>
                    <h5 className='text-primary '>{book?.author}</h5>
                    <p className='lead'> {book?.description}</p>
                    <StarsReview rating={totalStars} size={32} />
                </div>
            </div>
            <CheckoutAndReviewBox book={book} mobile={true} currentLoansCount={currentLoansCount}
                isAuthotenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                checkoutBook={checkoutBook}
                isReviewLeft={isReviewLeft}
                submitReview={submitReview} />
            <hr />
            <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
        </Container>
    </div>
)
            }
