import { useOktaAuth } from '@okta/okta-react/bundles/types'
import React, { useEffect, useState } from 'react'
import MessageModel from '../../../models/MessageModel';
import { SpinnerLoading } from '../../utils/SpinnerLoading';

export const Messages = () => {

    const { authState } = useOktaAuth();
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages

    const [messages, setMessages] = useState<MessageModel[]>([]);
    
    //Pagination
    const [messagerPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //useEffeect
    useEffect(() => {
        const fetchuserMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url =
                    `http://localhost:8080/api/messages/secure/findByUserEmail/userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=${messagerPerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-type': 'application/json'
                    }
                };
                const messageResponse = await fetch(url, requestOptions);
                if (!messageResponse.ok) {
                    throw new Error('Something went wrong');
                }
                const messagesResponseJson =await messageResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setLoadingMessages(false);
        }
        fetchuserMessages().catch((error: any) => {
            setLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage]);
    if (loadingMessages) {
        return (
            <SpinnerLoading/>
        )
    }
    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{ }httpError</p>
            </div>
        )
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>Messages</div>
  )
}
