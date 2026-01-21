import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../public/assets/main-logo.svg';
import { Menu, Search, X } from 'lucide-react';
import { menu } from '@/constants/menu';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    return (
        <header className='absolute w-full top-0 z-20'>
            {/* Gradient Overlay - Top to Bottom */}
            <div
                className='absolute inset-x-0 top-0 h-32 pointer-events-none -z-10'
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.3) 48%, rgba(0, 0, 0, 0) 100%)',
                }}
            />

            <nav className='relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6'>
                <div className='flex items-center justify-between'>
                    <Link to='/'>
                        <img className='h-6 sm:h-[30px]' src={Logo} alt='Moovie' draggable='false' />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className='hidden md:flex space-x-6'>
                        {menu.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={item.link}
                                        className={({ isActive }) =>
                                            `text-[15px] font-medium capitalize transition-colors ${isActive ? 'text-[#0957e1]' : 'text-neutral-300'}`
                                        }>
                                        {item.page}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop Search */}
                    <div className='hidden md:flex items-center justify-center gap-8 max-w-2xl'>
                        <div className='relative flex items-center'>
                            <input
                                type='text'
                                placeholder="What's your next watch?"
                                className={`pl-4 pr-11 py-2 placeholder:text-xs placeholder:font-medium bg-transparent border border-gray-500 rounded-full focus:outline-none text-white text-sm transition-all duration-300 ease-in-out 
                            ${isSearchOpen ? 'w-64 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4 pointer-events-none border-0'}`}
                            />

                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className='text-white hover:text-gray-300 transition-colors absolute right-3'
                                aria-label='Toggle search'>
                                <Search size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Icons */}
                    <div className='flex md:hidden items-center gap-4'>
                        {/* Mobile Search Icon */}
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className='text-white hover:text-gray-300 transition-colors'
                            aria-label='Search'>
                            <Search size={22} />
                        </button>

                        {/* Hamburger Menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='text-white hover:text-gray-300 transition-colors'
                            aria-label='Toggle menu'>
                            {isMobileMenuOpen ?
                                <X size={22} />
                            :   <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className='md:hidden absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-sm rounded-xl overflow-hidden'>
                        <ul>
                            {menu.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.link}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-5 py-3 text-base font-medium capitalize transition-colors ${isActive ? 'text-[#0957e1]' : 'text-neutral-300 hover:bg-zinc-800'}`
                                        }>
                                        {item.page}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Mobile Search Modal */}
            {isMobileSearchOpen && (
                <div className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start pt-20 px-4'>
                    <div className='w-full max-w-md mx-auto'>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder="What's your next watch?"
                                autoFocus
                                className='w-full pl-4 pr-12 py-3 bg-zinc-900 border border-gray-500 rounded-full focus:outline-none focus:border-[#0957e1] text-white text-sm placeholder:text-xs placeholder:font-medium'
                            />
                            <button
                                onClick={() => setIsMobileSearchOpen(false)}
                                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                                aria-label='Close search'>
                                <X size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
