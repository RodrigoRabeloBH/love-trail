
import ListsTab from '@/components/lists/ListsTab';
import React from 'react';
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/likeActions';


export default async function ListsPage({ searchParams }: { searchParams: { type: string } }) {
  const likedIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div className='container mx-auto'>
      <ListsTab members={members} likedIds={likedIds} />
    </div>
  )
}
