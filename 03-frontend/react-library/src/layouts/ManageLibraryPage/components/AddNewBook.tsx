import { useOktaAuth } from '@okta/okta-react'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import AddBookRequest from '../../../models/AddBookRequest';

export const AddNewBook = () => {
    const { authState } = useOktaAuth();

    //New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    //Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }
    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }
    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result)
        };
        reader.onerror = function (err: any) {
            console.log('Error', err);
        }
    }

    async function submitNewBook() {
        const url = `${process.env.REACT_APP_API}/admin/secure/add/book`;
        if (authState?.isAuthenticated && title !== '' && author !== '' && category !== 'Category'
            && description !== '' && copies > 0) {
            const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category);
            book.img = selectedImage;
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            };
            const submitNewBookResponse = await fetch(url, requestOptions);
            if (!submitNewBookResponse.ok) {
                throw new Error("Something wrong")
            }
            setAuthor('');
            setTitle('');
            setDescription('');
            setCopies(0);
            setCategory('Category');
            setSelectedImage(null);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
    return (
        <Container className='mt-5 mb-5'>
            {displaySuccess &&
                <div className='alert alert-success' role='alert'>
                    Book added successfully
                </div>
            }
            {displayWarning &&
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Add a new Book
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label' >
                                    Title
                                </label>
                                <input type="text"
                                    className='form-control'
                                    name='title'
                                    required
                                    onChange={e => setTitle(e.target.value)}
                                    value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label htmlFor="" className='form-label'>
                                    Author
                                </label>
                                <input type="text" className='form-control'
                                    name='author' required
                                    onChange={e => setAuthor(e.target.value)}
                                    value={author} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {category}
                                </button>
                                <ul id='addNewBook' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li ><a href="#" onClick={() => categoryField("FE")} className='dropdown-item'>Front End</a></li>
                                    <li ><a href="#" onClick={() => categoryField("BE")} className='dropdown-item'>Back End</a></li>
                                    <li ><a href="#" onClick={() => categoryField("Data")} className='dropdown-item'>Data</a></li>
                                    <li ><a href="#" onClick={() => categoryField("DevOps")} className='dropdown-item'>DevOps</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>
                                Description
                            </label>
                            <textarea id="exampleFormControlTextarea1" rows={3} className='form-control'
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='for-label' >
                                Copies
                            </label>
                            <input type="number" className='form-control' name='copies' required
                                onChange={e => setCopies(Number(e.target.value))} value={copies} />
                        </div>
                        <input type="file" onChange={e => base64ConversionForImages(e)} />
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewBook}>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Container>
    )
}
