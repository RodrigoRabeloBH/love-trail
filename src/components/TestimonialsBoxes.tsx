import React from 'react'
import Testimonial from './Testimonial'
import { Button } from '@nextui-org/react'

export default function TestimonialsBoxes() {
    return (
        <section className='p-10'>
            <div className='container mx-auto mt-5'>
                <div className='flex justify-center items-center mb-10'>
                    <h2 className='text-purple-500 text-2xl font-bold md:text-5xl'>
                        What’s different about LoveTrail?
                    </h2>
                </div>
                <div className='flex flex-col md:flex-row gap-4 rounded-lg'>
                    <Testimonial
                        message='Life-Changing Experience!'
                        name='Zoye Doe'>
                        <p className='px-6'>
                            I’ve been using LoveTrail for just a week, and it has completely transformed my dating life!
                            The app’s intuitive interface makes it easy to connect with like-minded people. Within days,
                            I found my soulmate, and we’re planning our first date. Thank you, LoveTrail!
                        </p>
                        <p className='mt-3 flex justify-center items-center'>
                            <span className='text-yellow-300 text-xl'>★★★★★</span>
                        </p>
                    </Testimonial>
                    <Testimonial
                        message='A Match Made in App Heaven'
                        name='Skinner Green'>
                        <p className='px-6'>
                            LoveTrail is the real deal! I was skeptical at first, but after swiping through profiles,
                            I stumbled upon someone who shares my love for obscure indie films and spicy tacos.
                            We hit it off instantly, and now we’re inseparable. LoveTrail, you’ve got my vote.
                        </p>
                        <p className='mt-3 flex justify-center items-center'>
                            <span className='text-yellow-300 text-xl'>★★★★☆</span>
                        </p>
                    </Testimonial>
                    <Testimonial
                        message='From Single to Taken!'
                        name='Lisa Blue'>
                        <p className='px-6'>
                            LoveTrail worked like magic for me! The algorithm must have known exactly what I needed.
                            I met someone who appreciates my terrible puns and enjoys late-night stargazing.
                            We’re both hopeless romantics, and LoveTrail brought us together. Highly recommend.
                        </p>
                        <p className='mt-3 flex justify-center items-center'>
                            <span className='text-yellow-300 text-xl'>★★★★☆</span>
                        </p>
                    </Testimonial>
                </div>
                <div className='flex justify-center items-center mt-20'>
                    <Button
                        className='bg-purple-500 text-white w-1/2 md:w-1/4'
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </section>
    )
}
