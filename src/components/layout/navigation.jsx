import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/main-logo.svg';
import Switcher from '../ui/switcher';
import { Transition } from '@headlessui/react';
import { HiMenuAlt3, HiOutlineX } from 'react-icons/hi';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    let location = useLocation();

    const Data = [
        {
            page: 'movies',
            link: '/movies',
        },
        {
            page: 'discover',
            link: '/discover',
        },
        {
            page: 'upcoming',
            link: '/upcoming',
        },
        {
            page: 'series',
            link: '/series',
        },
    ];

    return (
        <header>
            <nav className='z-10 w-full fixed top-0 bg-white'>
                {location.pathname === '/' ?
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-1 flex justify-between items-center'>
                        <Link to='/'>
                            <img
                                className='h-5 sm:h-6'
                                src={Logo}
                                alt='Moovie'
                                draggable='false'
                            />
                        </Link>
                        <div className='flex gap-4 items-center'>
                            {Data.slice(0, 2).map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        className='hidden sm:block text-base capitalize'>
                                        {item.page}
                                    </Link>
                                );
                            })}
                            <div className='-mr-2 flex sm:hidden'>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type='button'
                                    className='inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 '
                                    aria-controls='mobile-menu'
                                    aria-expanded='false'>
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {!isOpen ?
                                        <HiMenuAlt3 size={24} />
                                    :   <HiOutlineX size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                :   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-1'>
                        <div className='flex items-center justify-between h-16'>
                            <div className='flex items-center'>
                                <div className='flex-shrink-0'>
                                    <Link to='/'>
                                        <img
                                            className='h-5 sm:h-6'
                                            src={Logo}
                                            alt='Moovie'
                                            draggable='false'
                                        />
                                    </Link>
                                </div>
                                <div className='hidden md:block'>
                                    <div className='ml-10 flex items-baseline space-x-4 tracking-wider'>
                                        {Data.map((item, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    to={item.link}
                                                    className='px-3 py-2 rounded-md text-base capitalize'>
                                                    {item.page}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end px-3 grow'>
                                <Switcher />
                            </div>
                            <div className='-mr-2 flex md:hidden'>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type='button'
                                    className='text-whiteLight inline-flex items-center justify-center p-2 rounded-md text-whitePrimary hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 '
                                    aria-controls='mobile-menu'
                                    aria-expanded='false'>
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {!isOpen ?
                                        <HiMenuAlt3 size={24} />
                                    :   <HiOutlineX size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                }

                {/* mobile version */}
                <Transition
                    show={isOpen}
                    enter='transition ease-out duration-100 transform'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='transition ease-in duration-75 transform'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'>
                    {(ref) => (
                        <div
                            ref={ref}
                            className='md:hidden h-screen flex flex-col gap-6 justify-center items-center'
                            id='mobile-menu'>
                            {Data.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        className='text-base capitalize'>
                                        {item.page}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </Transition>
            </nav>
        </header>
    );
}
