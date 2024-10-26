import React from 'react'
import { getMembers } from '../actions/memberActions'
import MembersCard from '@/components/members/MembersCard';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import PaginationComponent from '@/components/PaginationComponent';
import { UserFilters } from '@/types';

export default async function MembersPage({ searchParams }: { searchParams: UserFilters }) {
    const members = await getMembers(searchParams);
    const likeIds = await fetchCurrentUserLikeIds();

    return (
        <>
            <div className='container mx-auto p-5'>
                <div className='mt-10 grid md:grid-cols-3 lg:grid-cols-5 gap-8'>
                    {members && members.map(member => (
                        <MembersCard member={member} key={member.id} likeIds={likeIds} />
                    ))}
                </div>
            </div>
            <PaginationComponent />
        </>
    )
}
