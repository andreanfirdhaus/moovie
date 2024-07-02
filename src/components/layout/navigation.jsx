import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/main-logo.svg';
import Switcher from '../ui/switcher.jsx';
import { Transition } from '@headlessui/react';

export default function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);

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
        <nav className='z-10 w-full fixed top-0 bg-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-1'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                            <Link to='/'>
                                <img
                                    className='h-5 sm:h-6'
                                    src={logo}
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
                                            to={item.link}
                                            key={index}
                                            className='text-whiteLight dark:text-white px-3 py-2 rounded-md text-base font-bold'>
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
                            <span className='sr-only'>Open main menu</span>
                            {!isOpen ?
                                <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            :   <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            }
                        </button>
                    </div>
                </div>
            </div>

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
                                    to={item.link}
                                    key={index}
                                    className='text-base font-semibold'>
                                    {item.page}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Transition>
        </nav>
    );
}
