import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReviewModel from "../../../models/ReviewModel"
import { Pagination } from "../../utils/pagination";
import { Review } from "../../utils/Review";
import { SpinnerLoading } from "../../utils/SpinnerLoading";

export const ReviewListPage = () => {
    
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewPerPage] = useState(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const bookId = (window.location.pathname).split('/')[2];
   
    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage - 1}&size=${reviewPerPage}`;

            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);
           

            const loadedReview: ReviewModel[] = [];



            for (const key in responseData) {
                loadedReview.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                })
            
            };
            setReviews(loadedReview);
            setIsLoading(false);

        }
        fetchBookReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
            {console.log(reviews)}
        })
    }, [currentPage]);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }
    if (httpError) {
        return (
            <Container className="m-5">
                <p>{httpError }</p>
            </Container>
        )
    }
    
    const indexOfLastReview: number = currentPage * reviewPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewPerPage;

    let lastItem = reviewPerPage *
        currentPage <= totalAmountOfReviews ? reviewPerPage * currentPage
        : currentPage * totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
      
    
    return (
      
        <Container className="mt-5">
                

            <div>
                <h3>
                
                    Comments: ({reviews.length})
                </h3>
            </div>
            <p>
                {indexOfFirstReview+1} to {lastItem} of {totalAmountOfReviews} items
            </p>
            <div className="row">
                {reviews.map(review => (
    <Review review={review} key={review.id}/>
))}
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage}totalPages={totalPages} paginate={paginate}/> }
        </Container>
    );
}