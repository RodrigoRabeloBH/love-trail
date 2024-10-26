
import React from 'react'
import MessageSidebar from './MessageSidebar'
import { getMessagesByContainer } from '../actions/messageActions'
import MessageTable from './MessageTable';

export default async function MessagesPage({ searchParams }: { searchParams: { container: string } }) {
    const messages = await getMessagesByContainer(searchParams.container);

    return (
        <div className='container mx-auto'>
            <div className='flex flex-col mx-5 md:mx-0'>
                <div className=''>
                    <MessageSidebar messages={messages} />
                </div>
                <div className='mt-5'>
                    <MessageTable messages={messages} />
                </div>
            </div>
        </div>
    )
}
