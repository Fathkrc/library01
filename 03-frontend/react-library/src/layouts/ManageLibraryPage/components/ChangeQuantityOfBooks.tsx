import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import BookModel from '../../../models/BookModel';
import { Pagination } from '../../utils/pagination';
import { SpinnerLoading } from '../../utils/SpinnerLoading';
import ChangeQuantityOfBook from './ChangeQuantityOfBook';

export const ChangeQuantityOfBooks = () => {
    const [books, setbooks] = useState<BookModel[]>([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [bookDelete, setBookDelete] = useState(false);



    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books?page=${currentPage - 1}&size=${booksPerPage}`

            let url: string = ``;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
    }, [currentPage,bookDelete])

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const deleteBook = () => setBookDelete(!bookDelete);
    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError }</p>
        </div>
        )
        
}
    return (
        <Container className='mt-5' >
            {totalAmountOfBooks > 0 ?
                <>
                    <div className='mt-2'>
                        <h3>Number of Results: { totalAmountOfBooks}</h3>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to { lastItem} of {totalAmountOfBooks } items : 
                    </p>
                    {books.map(book => (
                        <ChangeQuantityOfBook book={book} key={book.id} deleteBook = { deleteBook } />
                    ))}
                </>
                :
                <h5>Add a book before changing quantity</h5>
                
            }
            {
                totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </Container>
    )
}
