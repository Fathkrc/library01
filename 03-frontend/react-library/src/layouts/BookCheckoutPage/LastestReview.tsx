import React from 'react'
import { Link } from 'react-router-dom'
import ReviewModel from '../../models/ReviewModel'
import { Review } from '../utils/Review'

export const LatestReviews: React.FC<{
    reviews: ReviewModel[],
    bookId: number | undefined,
    mobile: boolean

}> = (props) => {
    return (
        <div className={props.mobile ? 'mt-3' : 'row mt-5'}>
            <div className={props.mobile ? '' : 'col-small-2 col-md-2'}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className='col-sm-10 col-md-10'>
                {props.reviews.length > 0 ?
                    <>
                        {props.reviews.slice(0, 3).map(eachReview => (
                            <Review review={eachReview} key={eachReview.id}></Review>
                        ))}

                        <div className='m-3'>
                            <Link type='button' to={`/reviewlist/${props.bookId}`} className='btn main-color btn-outline-info btn-lg text-white' >
                                Reach all reviews.
                            </Link>
                        </div>
                    </>
                    :

                    <div className='m-3'>
                        <p className='lead'>
                            No reviews for this book.
                        </p>
                    </div>
                    }
            </div>

        </div>
    )
}
