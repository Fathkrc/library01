import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import AdminMessageRequest from '../../../models/AdminRequest';
import MessageModel from '../../../models/MessageModel';
import { Pagination } from '../../utils/pagination';
import { SpinnerLoading } from '../../utils/SpinnerLoading';
import { AdminMessage } from './AdminMessage';

export const AdminMessages = () => {
    const { authState } = useOktaAuth();

    //Normal Loading Pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages endpoint State
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState(5);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Recall useEffect

    const [btnSubmit, setBtnSubmit] = useState(false);

    //useEffect it is
    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const messageResponse = await fetch(url, requestOptions);
                if (!messageResponse.ok) {
                    throw new Error('Somnething went wrong');
                }
                const messageResponseJson = await messageResponse.json();
                setMessages(messageResponseJson._embedded.messages);
                setTotalPages(messageResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((err: any) => {
            setIsLoadingMessages(false);
            setHttpError(err.messages);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage,btnSubmit])
    if (isLoadingMessages) {
        return (
            <SpinnerLoading/>
        )
    }
    if (httpError) {
        <Container>
            <p>{httpError} :(</p>
        </Container>
    }

    async function submitResponseToQuestion(id: number, response: string) {
        const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;
        if (authState && authState?.isAuthenticated && id !== null && response !== '') {
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            };
            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if (!messageAdminRequestModelResponse) {
                throw new Error("something went wrong!");
            }
            setBtnSubmit(!btnSubmit);
        };

        
    }
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div className='mt-3'>
            {messages.length > 0 ?
                <>
                    <h5>Pending Q/A</h5>
                    {messages.map(message => (
                        <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion} />
                    )) }
                </>
                :
                <h5>No Pending Q/A</h5>

            }
            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />    
        }
        </div>
    )
}
