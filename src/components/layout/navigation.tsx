import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import Logo from '@/assets/logo.svg';
import { Search } from 'lucide-react';
import { menu } from '@/constants/menu';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                        MOovie
                        {/* <img className='h-6 sm:h-8' src={Logo} alt='Moovie' draggable='false' /> */}
                    </Link>

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

                    <div className='flex items-center justify-center gap-8 max-w-2xl'>
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
                                <Search size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
