
import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberByUserId, getMemberPhotosByUserId } from '@/app/actions/memberActions';
import React from 'react'
import MemberPhotos from '@/components/MemberPhotos';
import CardInnerWrapper from '@/components/CardInnerWrapper';

export default async function PhotosEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (

        <CardInnerWrapper
            header='Edit Photo'
            body={<MemberPhotos photos={photos!} editing={true} mainImageUrl={member?.image} />}
        />
    )
}
