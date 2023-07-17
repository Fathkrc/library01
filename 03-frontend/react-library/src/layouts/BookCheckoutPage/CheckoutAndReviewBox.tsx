import { Link } from "react-router-dom"
import BookModel from "../../models/BookModel"
import { LeaveAReview } from "../utils/LeaveAReview"

export const CheckoutAndReviewBox: React.FC<{
    book: BookModel | undefined,
    mobile: boolean,
    currentLoansCount: number,
    isAuthotenticated: any,
    isCheckedOut: boolean,
    checkoutBook: any,
    isReviewLeft: any,
    submitReview:any
}> = (props) => {

    function buttonRender() {
        if (props.isAuthotenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (<button onClick={() => props.checkoutBook()} className="btn btn-lg btn-success ">Checkout</button>)
            }
            else if (props.isCheckedOut) {
                return (
                    <p><b>Book checked out. </b></p>
                )
            } else if (!props.isCheckedOut) {
                return (
                    <p className="text-danger"> Too many book checked out.</p>
                )
            }
        }
        return (
            <Link to={'/login'} className='btn btn-success btn-lg '>Sign in</Link>
        )
    }
    function reviewRender() {
        if (props.isAuthotenticated && !props.isReviewLeft) {
            return (
                
                <LeaveAReview submitReview={props.submitReview}/> 
            )
        } else if (props.isAuthotenticated && props.isReviewLeft) {
            return (
                <p>Thank you for review</p>
            )
        }
        return (
            <div><hr />
                <b>
                Sign in to leave a review
            </b>
            </div>
        )
    }
    return (

        <div className={props.mobile ? 'card d-flex' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                        <h4 className="text-success">Available
                        </h4>
                        :
                        <h4 className="text-danger">
                            Wait List
                        </h4>

                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    )

}
