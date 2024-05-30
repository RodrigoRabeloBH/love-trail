'use client'
import { Photo } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import React from 'react'
import { Image } from '@nextui-org/react'

type Props = {
    photo: Photo
}

export default function MemberImage({ photo }: Props) {
    return (
        <div>
            {photo?.publicId
                ? (
                    <CldImage
                        alt='Image of member'
                        src={photo.publicId}
                        width={300}
                        height={300}
                        crop='fill'
                        gravity='faces'
                        className='rounded-2xl'
                        priority={true}
                    />
                )
                : (
                    <Image
                        alt='photo of member'
                        src={photo?.url || '/images/user.png'}
                        className='object-cover aspect-square'
                        width={300}
                        height={300}
                    />
                )}
        </div>
    )
}
