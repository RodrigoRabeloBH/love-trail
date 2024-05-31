import React from 'react'
import { getMembers } from '../actions/memberActions'
import MembersCard from '@/components/members/MembersCard';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';

export default async function MembersPage() {
    const members = await getMembers();
    const likeIds = await fetchCurrentUserLikeIds();

    return (
        <div className='container mx-auto p-5 h-[75vh] mt-10'>
            <div className='mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-8'>
                {members && members.map(member => (
                    <MembersCard member={member} key={member.id} likeIds={likeIds} />
                ))}
            </div>
        </div>
    )
}
