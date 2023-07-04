import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ReturnBook } from '../components/ReturnBook'
import BookModel from '../../../models/BookModel'
import { SpinnerLoading } from '../../utils/SpinnerLoading'

export const Carousel = () => {
    const [books, setbooks] = useState<BookModel[]>([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = "http://localhost:8080/api/books"

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            const loadedBook: BookModel[] = [];

            for (const k in responseData) {
                loadedBook.push({
                    id: responseData[k].id,
                    title: responseData[k].title,
                    author: responseData[k].author,
                    description: responseData[k].description,
                    copies: responseData[k].copies,
                    copiesAvailable: responseData[k].copiesAvailable,
                    category: responseData[k].category,
                    img: responseData[k].img

                })
            }
            setbooks(loadedBook);
            setisLoading(false);
        };
        fetchBook().catch((error: any) => {
            setisLoading(false);
            setHttpError(error.message);
        })
    }, [])

    if (isLoading) {
        return (
                <SpinnerLoading/>
        )
    }
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }


    return (
        <Container >
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book</h3>
            </div>
            <div id='carouselExampleControls'
                className='carousel carousel-dark slide mt-5
          d-none d-lg-block' data-bs-interval='false'>

                {/* Destkop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}

                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}

                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(6.9).map(book => (
                                <ReturnBook book={book} key={book.id} />
                            ))}

                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls'
                        data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden="true"></span>
                        <span className='visually-hidden'> Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls'
                        data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden="true"></span>
                        <span className='visually-hidden'> Next</span>
                    </button>
                </div>
            </div>
            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center '>
                    <ReturnBook book={ books[7]} key={books[7].id} />
                    
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a href="#" className='btn btn-outline-secondary btn-lg'> View More</a>
            </div>

        </Container>
    )
}
