import Link from 'next/link'
import React from 'react'
import { GiLovers } from 'react-icons/gi'

export default function Footer() {
    return (
        <footer className='bg-gradient-to-r from-purple-400 to-purple-800 py-6 mt-10'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
                <div className='mb-4 md:mb-0'>
                    <Link href={'/'}>
                        <GiLovers className='text-gray-100' size={30} />
                    </Link>
                </div>
                <div>
                    <p className='text-sm text-white mt-2 md:mt-0'>
                        &copy; 2024 NextMatch - All rights reserved.
                    </p>
                </div>
                <div>
                    <p className='text-sm text-gray-100 mt-2 md:mt-0'>
                        Developed by Rodrigo Rabelo
                    </p>
                </div>
            </div>
        </footer>
    )
}
