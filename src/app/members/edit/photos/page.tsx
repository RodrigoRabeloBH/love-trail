import { getAuthUserId } from '@/app/actions/authActions'
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import DeleteButton from '@/components/DeleteButton';
import StarButton from '@/components/StarButton';
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import React from 'react'

export default async function PhotosEditPage() {
    const userId = await getAuthUserId();

    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Edit Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-3 p-5'>
                    {photos && photos.map(photo => (
                        <div key={photo.id} className='relative'>
                            <Image
                                alt='photo of member'
                                src={photo.url}
                                className='object-cover aspect-square'
                                width={300}
                                height={300}
                            />
                            <div className='absolute top-3 left-3 z-50'>
                                <StarButton loading={false} selected={true} />
                            </div>
                            <div className='absolute top-3 right-3 z-50'>
                                <DeleteButton loading={false} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
    )
}
