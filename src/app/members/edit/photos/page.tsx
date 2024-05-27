
import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberByUserId, getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotos from '@/components/MemberPhotos';

export default async function PhotosEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Edit Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotoUpload />
                <MemberPhotos photos={photos!} editing={true} mainImageUrl={member?.image}/>
            </CardBody>
        </>
    )
}
