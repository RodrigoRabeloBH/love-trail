import React from 'react'
import { getMembers } from '../actions/memberActions'
import MembersCard from '@/components/members/MembersCard';

export default async function MembersPage() {
    const members = await getMembers();

    return (
        <div className='mt-10 grid md:grid-cols-3 lg:grid-cols-6 gap-8'>
            {members && members.map(member => (
                <MembersCard member={member} key={member.id} />
            ))}
        </div>
    )
}
