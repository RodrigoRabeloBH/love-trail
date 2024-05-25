'use client'

import MembersCard from '@/components/members/MembersCard';
import { Tab, Tabs } from '@nextui-org/react';
import { Member } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useTransition } from 'react';
import React from 'react';

type Props = {
    members: Member[];
    likedIds: string[];
}

export default function ListsTab({ likedIds, members }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const tabs = [
        { id: 'source', label: 'Who I have liked' },
        { id: 'target', label: 'Who that like me' },
        { id: 'mutual', label: 'Mutual likes' }
    ]

    function handleTabChange(key: Key): void {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            params.set('type', key.toString());
            router.replace(`${pathname}?${params.toString()}`);
        });
    }
    return (
        <div className='flex w-full flex-col gap-5'>
            <Tabs
                aria-label='Like tabs'
                items={tabs}
                color='secondary'
                onSelectionChange={(key) => handleTabChange(key)}
            >
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {isPending ? (
                            <div className='flex justify-center items-center'>
                                <p className='text-xl text-purple-500'>Loading...</p>
                            </div>)
                            : (
                                <>
                                    {members.length > 0
                                        ? (
                                            <div className='mt-10 grid md:grid-cols-3 lg:grid-cols-6 gap-8'>
                                                {members.map(member => (
                                                    <MembersCard member={member} likeIds={likedIds} key={member.id} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div>
                                                <p className='text-xl text-purple-700'>No members for this filter</p>
                                            </div>)}
                                </>
                            )}
                    </Tab>
                )}
            </Tabs>
        </div>
    )
}
