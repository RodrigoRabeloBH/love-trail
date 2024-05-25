'use client';

import { calculateAge } from '@/lib/util';
import { Button, Card, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import { Member } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
    member: Member
}

export default function MemberSidebar({ member }: Props) {
    const pathname = usePathname();
    const basePath = `/members/${member.userId}`;

    const navLinks = [
        { name: 'Profile', href: `${basePath}` },
        { name: 'Photos', href: `${basePath}/photos` },
        { name: 'Chat', href: `${basePath}/chat` }
    ]
    return (
        <Card className='w-full mt-10 items-center h-[60vh] md:h-[80vh]'>
            <CardBody>
                <div className='flex flex-col items-center'>
                    <Image
                        width={200}
                        height={200}
                        src={member.image || '/images/user.png'}
                        alt={member.name}
                        className='rounded-full aspect-square object-cover mb-2'
                    />
                    <div className='text-2xl mb-2'>
                        {member.name}, {calculateAge(member.dateOfBirth)}
                    </div>
                    <div className='text-sm text-neutral-500'>
                        {member.city}, {member.country}
                    </div>
                </div>
                <Divider className='my-3' />
                <nav className='flex flex-col p-4 ml-4 gap-2 md:overflow-hidden text-xl'>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`block rounded ${pathname === link.href
                                ? 'text-purple-500'
                                : 'hover:text-secondary/50'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </CardBody>
            <CardFooter>
                <Button
                    as={Link}
                    href='/members'
                    fullWidth
                    color='secondary'
                    className='bg-purple-500'
                >
                    Go back
                </Button>
            </CardFooter>
        </Card>
    )
}
