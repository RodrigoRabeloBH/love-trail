import { auth } from '@/auth'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default async function Hero() {
    const session = await auth();
    return (
        <section className='bg-gradient-to-b from-purple-300 to-purple-600 py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
                <div className='text-center'>
                    <h1 className='text-4xl font-semibold text-white md:text-5xl'>
                        Meet your Match with LoveTrail
                    </h1>
                    <p className='my-8 text-xl text-white'>
                        Tired of endless swiping? LoveTrail is here to change the game.
                        Whether you’re looking for a casual chat or a lifelong partner, we’ve got you covered
                    </p>
                    <div>
                        {
                            !session?.user ? (
                                <Button
                                    as={Link}
                                    href='/register'
                                    variant='bordered'
                                    className='text-white'
                                >
                                    Try now
                                </Button>
                            ) : (
                                <Button
                                    as={Link}
                                    href='/members'
                                    variant='bordered'
                                    className='text-white'
                                >
                                    See members
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
