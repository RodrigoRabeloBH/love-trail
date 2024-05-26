import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '@/components/members/MemberSidebar';
import { Card } from '@nextui-org/react';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);

    const basePath = `/members/edit`;

    const navLinks = [
        { name: 'Edit Profile', href: `${basePath}` },
        { name: 'Update Photos', href: `${basePath}/photos` }
    ];

    if (!member)
        return notFound();


    return (
        <div className="container mx-auto p-5">
            <div className='xl:grid grid-cols-12 gap-5'>
                <div className='col-span-3 h-[60vh] md:h-[80vh]'>
                    <MemberSidebar member={member} navLinks={navLinks} />
                </div>
                <div className='col-span-9'>
                    <Card className='w-full mt-10 h-[80vh]'>
                        {children}
                    </Card>
                </div>
            </div>
        </div>
    )
}
