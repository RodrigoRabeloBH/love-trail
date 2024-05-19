'use client'
import {
    Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand,
    NavbarItem, Button, NavbarMenu, NavbarMenuItem
} from '@nextui-org/react'
import { Session } from 'next-auth';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GiLovers } from 'react-icons/gi';
import UserMenu from './UserMenu';

type Props = {
    session: Session | null
}

export default function TopNav({ session }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();

    const menuItems = [
        { 'label': 'Matches', 'href': '/members' },
        { 'label': 'Lists', 'href': '/lists' },
        { 'label': 'Messages', 'href': '/messages' }
    ];

    return (
        <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className='bg-gradient-to-r from-pink-400 to-pink-800'
            classNames={{ item: ['text-md', 'text-white'] }}
            position='sticky'
        >
            <NavbarContent>
                <NavbarMenuToggle className="sm:hidden" />
                <NavbarBrand as={Link} href='/'>
                    <GiLovers className='text-gray-100' size={40} />
                    <div className='font-bold text-3xl flex'>
                        <span className='text-gray-600'>Next</span>
                        <span className='text-gray-100'>Match</span>
                    </div>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem
                        as={Link}
                        href={item.href}
                        isActive={pathName === item.href}
                        className={`${pathName === item.href ? '' : 'text-gray-800'} hover:text-white`}
                        key={index}>
                        {item.label}
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                {session?.user
                    ?
                    (<UserMenu user={session?.user} />) : (
                        <>
                            <Button
                                onClick={() => { setIsMenuOpen(false) }}
                                as={Link} href='/login'
                                variant='bordered'
                                className='text-white'>
                                Login
                            </Button>
                            <Button
                                onClick={() => { setIsMenuOpen(false) }}
                                as={Link} href='/register'
                                variant='bordered'
                                className='text-white'>
                                Register
                            </Button>
                        </>
                    )}
            </NavbarContent>
            <NavbarMenu className='bg-gradient-to-r from-pink-300 to-pink-800'>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index} isActive={pathName === item.href}>
                        <Link
                            className={`${pathName === item.href ? 'text-white' : 'text-gray-600'} hover:text-white`}
                            href={item.href}
                            onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
