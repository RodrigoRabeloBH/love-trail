
import React from 'react'
import MessageSidebar from './MessageSidebar'
import { getMessagesByContainer } from '../actions/messageActions'

export default async function MessagesPage({ searchParams }: { searchParams: { container: string } }) {
    const messages = await getMessagesByContainer(searchParams.container);

    return (
        <div className='container mx-auto'>
            <div className='flex flex-col mx-5 md:mx-0'>
                <div className=''>
                    <MessageSidebar />
                </div>
                <div className='mt-5'>
                    {messages.length > 0 && (
                        messages.map(message => (
                            <p key={message.id}>
                                {message.text}
                            </p>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
