import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'
import ChatForm from './ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'
import { getAuthUserId } from '@/app/actions/authActions';
import MessageBox from './MessageBox';

export default async function ChatPage({ params }: { params: { userId: string } }) {
    const messages = await getMessageThread(params.userId);
    const userId = await getAuthUserId();

    const body = (
        <div>
            {messages.length === 0
                ? 'No messages to display'
                : (
                    <div>
                        {messages.map(message => (
                            <MessageBox
                                currentUserId={userId}
                                message={message}
                                key={message.id} />
                        ))}
                    </div>
                )}
        </div>
    )
    return (
        <CardInnerWrapper
            header='Chat'
            body={body}
            footer={<ChatForm />}
        />
    )
}
