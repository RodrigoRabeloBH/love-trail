import React from 'react'
import { getMembers } from '../actions/memberActions'
import MembersCard from '@/components/members/MembersCard';

export default async function MembersPage() {
    const members = await getMembers();

    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
            {members && members.map(member => (
                <MembersCard member={member} key={member.id} />
            ))}
        </div>
    )
}
