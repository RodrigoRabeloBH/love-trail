import { calculateAge } from '@/lib/util'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import LikeButton from '../likeButton/LikeButton'

type Props = {
    member: Member,
    likeIds: string[]
}

export default function MembersCard({ member, likeIds }: Props) {
    const hasLiked = likeIds.includes(member.userId);

    return (
        <Card
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
        >
            <CardBody className="overflow-visible p-0">
                <Image
                    isZoomed
                    alt={member.name}
                    width="100%"
                    src={member.image || '/images/user.png'}
                    className='aspect-square object-cover'
                />
                <div className='absolute top-3 right-3 z-50'>
                    <LikeButton targetId={member.userId} hasLiked={hasLiked} />
                </div>
            </CardBody>
            <CardFooter
                className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient'>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold'>{member.name}, {calculateAge(member.dateOfBirth)}</span>
                    <span className='font-semibold'>{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}
