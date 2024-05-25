import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import React from 'react'

export default async function PhotosPage({ params }: { params: { userId: string } }) {
    const photos = await getMemberPhotosByUserId(params.userId);

    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {photos && photos.map(photo => (
                        <div key={photo.id}>
                            <Image
                                alt='Image of member'
                                src={photo.url}
                                width={300}
                                height={300}
                                className='object-cover aspect-square mt-2'
                            />
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
    )
}
