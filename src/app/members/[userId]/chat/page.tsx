import CardInnerWrapper from '@/components/CardInnerWrapper'
import React from 'react'
import ChatForm from './ChatForm'
import { getMessageThread } from '@/app/actions/messageActions'
import { getAuthUserId } from '@/app/actions/authActions';
import MessageBox from './MessageBox';
import { fetchLikedMembers } from '@/app/actions/likeActions';

export default async function ChatPage({ params }: { params: { userId: string } }) {
    const messages = await getMessageThread(params.userId);
    const userId = await getAuthUserId();
    const mutualLikes = await fetchLikedMembers('mutual');

    const isMatch = (): boolean => {
        let match = false;

        mutualLikes.forEach(member => {
            if (member.userId === params.userId)
                match = true;
        })
        return match;
    }


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
        isMatch() ? (
            <CardInnerWrapper
                header='Chat'
                body={body}
                footer={<ChatForm />}
            />
        ) : (
            <CardInnerWrapper
                header='Chat'
                body={
                    <div className='text-xl text-default-600'>
                        You need to be a match to send a message
                    </div>}
            />
        )
    )
}
