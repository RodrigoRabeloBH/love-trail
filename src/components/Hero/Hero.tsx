import { Button, Image } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return (
        <section className='bg-gradient-to-b from-purple-300 to-purple-600'>
            <div className='container mx-auto flex flex-col-reverse md:flex-row items-center px-6 space-y-0'>
                <div className='flex flex-col mb-20 space-y-12 md:w-1/2'>
                    <h1 className='max-w-lg text-4xl font-semibold text-white text-center md:text-6xl md:text-left'>
                        Meet your Match with LoveTrail
                    </h1>
                    <div className='flex justify-center items-center md:justify-start'>
                        <p className='max-w-sm text-xl text-center text-white md:text-left'>
                            Tired of endless swiping? LoveTrail is here to change the game.
                            Whether you’re looking for a casual chat or a lifelong partner, we’ve got you covered
                        </p>
                    </div>
                    <div className='flex justify-center md:justify-start'>
                        <Button
                            as={Link}
                            href='/register'
                            variant='bordered'
                            className='text-white'
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
                <div className='md:w-1/2'>
                    <Image
                        width='100%'
                        alt='Hero Image'
                        src='https://cdn.pixabay.com/photo/2022/08/31/19/10/ukraine-7424066_640.png'
                    />
                </div>
            </div>
        </section>
    )
}
