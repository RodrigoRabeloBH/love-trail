'use client'
import {
    Navbar, NavbarContent, NavbarMenuToggle, NavbarBrand,
    NavbarItem, Button, NavbarMenu, NavbarMenuItem
} from '@nextui-org/react'
import { Session } from 'next-auth';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiLovers } from 'react-icons/gi';
import UserMenu from './UserMenu';
import { getUserInfoForNav } from '@/app/actions/userActions';
import Filters from './Filters';

type Props = {
    session: Session | null
}

export default function TopNav({ session }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();
    const [userInfo, setUserInfo] = useState({ name: null, image: null });

    const menuItems = [
        { 'label': 'Matches', 'href': '/members' },
        { 'label': 'Lists', 'href': '/lists' },
        { 'label': 'Messages', 'href': '/messages' }
    ];

    useEffect(() => {
        if (session?.user) {
            getUserInfoForNav()
                .then((res: any) => {
                    setUserInfo({ name: res.name, image: res.image })
                });
        }
    }, [userInfo.image, userInfo.name, session?.user])

    return (
        <>
            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className='bg-gradient-to-r from-purple-400 to-purple-800'
                classNames={{ item: ['text-md', 'text-white'] }}
                shouldHideOnScroll
            >
                <NavbarContent>
                    <NavbarMenuToggle className="sm:hidden" />
                    <NavbarBrand as={Link} href='/'>
                        <GiLovers className='text-gray-100' size={40} />
                        <div className='font-bold text-2xl flex md:text-3xl'>
                            <span className='text-gray-600'>Love</span>
                            <span className='text-gray-100'>Trail</span>
                        </div>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {menuItems.map((item, index) => (
                        <NavbarItem
                            as={Link}
                            href={item.href}
                            isActive={pathName === item.href}
                            className={`${pathName === item.href ? 'text-yellow-200' : 'text-white'} hover:text-yellow-200`}
                            key={index}>
                            {item.label}
                        </NavbarItem>
                    ))}
                </NavbarContent>
                <NavbarContent justify="end">
                    {session?.user
                        ?
                        (<UserMenu userInfo={userInfo} />) : (
                            <>
                                <Button
                                    onClick={() => { setIsMenuOpen(false) }}
                                    as={Link} href='/login'
                                    variant='bordered'
                                    size='sm'
                                    className='text-white'>
                                    Login
                                </Button>
                                <Button
                                    onClick={() => { setIsMenuOpen(false) }}
                                    as={Link} href='/register'
                                    variant='bordered'
                                    size='sm'
                                    className='text-white'>
                                    Register
                                </Button>
                            </>
                        )}
                </NavbarContent>
                <NavbarMenu className='bg-gradient-to-r from-purple-400 to-purple-800'>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={index} isActive={pathName === item.href}>
                            <Link
                                className={`${pathName === item.href ? 'text-yellow-200' : 'text-white'} hover:text-yellow-200`}
                                href={item.href}
                                onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            <Filters />
        </>
    )
}
