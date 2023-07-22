import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import BookModel from '../../models/BookModel';
import { Pagination } from '../utils/pagination';
import { SpinnerLoading } from '../utils/SpinnerLoading';
import { SearchBook } from './components/SearchBook';

export const SearchBooksPage = () => {
    const [books, setbooks] = useState<BookModel[]>([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [category, setCategory] = useState('Book Category');



    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;

            let url: string = ``;
            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }
            else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

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
        window.scroll(0, 0);
    }, [currentPage, searchUrl])

    if (isLoading) {
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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        }
        else {
            setSearchUrl(`${process.env.REACT_APP_API}/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
        }
        setCategory('Book category');
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLocaleLowerCase() === 'fe' ||
            value.toLocaleLowerCase() === 'be' ||
            value.toLocaleLowerCase() === 'data' ||
            value.toLocaleLowerCase() === 'devops'   
        ) {
            setCategory(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        }
        else {
            setCategory('All')
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
        
    }
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



    return (
        <div>
            <Container>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input type="search"
                                    className='form-control me-2'
                                    placeholder='Search'
                                    aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <Button className='btn btn-outline-success text-white'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </Button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <Dropdown >
                                <Dropdown.Toggle className=' btn-secondary dropdown-toggle'
                                    type='button'
                                    id='dropdownMenuButton1'
                                    data-bs-toogle='dropdown'
                                    aria-expanded='false'>
                                    {category}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Button href="#" className='dropdown-item' onClick={()=> categoryField('All')}>
                                            All
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button href="#" className='dropdown-item'onClick={()=> categoryField('FE')} >
                                            Front End
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button href="#" className='dropdown-item' onClick={()=> categoryField('BE')}>
                                            Back End
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button href="#" className='dropdown-item' onClick={()=> categoryField('Data')}>
                                            Data
                                        </Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button href="#" className='dropdown-item' onClick={()=> categoryField('DevOps')}>
                                            DevOps
                                        </Button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number Of  Results:({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <Button href="#" type='button' className='btn main-color 
                            btn-md
                            px-4
                            me-md-2
                            fw-bold
                             text-white'> Library Services</Button>
                        </div>

                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={paginate} />

                    }

                </div>
            </Container>
        </div>

    )
}
