import { useOktaAuth } from '@okta/okta-react'
import { useState } from 'react'
import MessageModel from '../../../models/MessageModel';

export const PostNewMessage = () => {
    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const submitNewQuestion = async () => {
        const url = `http://localhost:8080/api/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const messageRequestModel: MessageModel = new MessageModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageRequestModel)
            };
            const submitNewQuestionRequest = await fetch(url, requestOptions);
            if (!submitNewQuestionRequest.ok) {
                throw new Error('Something went wrong');
            }
            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }





    }

    return (
        <div className='card mt-3'>

            <div className='card-header'>
                Ask to Mr Furkir
            </div>
            <div className='card-body'>
                <form action="" method='POST'>
                    {displayWarning &&
                        <div className='alert alert-danger'>
                            All Fields must be filled out
                        </div>
                    }
                    {displaySuccess &&
                        <div className='alert alert-success' role='alert'>
                            Question added succesfully
                        </div>
                    }
                    <div className='mb-3'>
                        <label htmlFor="" className='form-label'>
                            Title
                        </label>
                        <input type="text" className='form-control' id='exampleFormControlInput1'
                            placeholder='Title'
                            value={title}
                            onChange={e => { setTitle(e.target.value) }} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='form-label'>
                            Question
                        </label>
                        <textarea className='form-control' name="" id="ExampleFormControlTextArea1"
                            rows={3}
                            onChange={e => setQuestion(e.target.value)}
                            value={question}
                        ></textarea>
                    </div>
                    <div>
                        <button type='button' className='btn btn-primary mt-3'
                            onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
