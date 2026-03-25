import { useRef, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { menu } from '@/constants/nav-menu';
import { Button } from '@/components/ui/button';
import { useNavSearch } from '@/components/layout/navbar/useNavSearch';
import { SearchResults } from './search-results';

const dropdownVariants = {
    initial: { opacity: 0, y: -4, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -4, scale: 0.98 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);

    const desktop = useNavSearch();
    const mobile = useNavSearch(isMobileSearchOpen);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                desktop.setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [desktop]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileActiveDropdown(null);
    };

    return (
        <header className='absolute w-full top-0 z-20'>
            <nav className='relative px-4 sm:px-6 lg:px-12 xl:px-24 py-5 md:py-6'>
                <div className='flex items-center justify-between space-x-4'>
                    <div className='flex items-center space-x-6'>
                        <Link to='/' aria-label='Moovie home'>
                            <img className='h-5 sm:h-6' src='/assets/logo.png' alt='Moovie' draggable='false' />
                        </Link>

                        <ul className='hidden md:flex items-center' aria-label='Main navigation'>
                            {menu.map((item, i) =>
                                item.hasDropdown && item.categories ?
                                    <li
                                        key={i}
                                        className='relative group'
                                        onMouseEnter={() => setActiveDropdown(item.page)}
                                        onMouseLeave={() => setActiveDropdown(null)}>
                                        <Button
                                            variant='link'
                                            size='sm'
                                            rounded='md'
                                            rightIcon={
                                                <ChevronDown
                                                    size={16}
                                                    strokeWidth={2.5}
                                                    className='transition-transform duration-[250ms] group-hover:rotate-180'
                                                />
                                            }
                                            className='mx-2 text-[15px] capitalize text-zinc-200 hover:text-zinc-100 hover:no-underline'>
                                            {item.page}
                                        </Button>

                                        <AnimatePresence>
                                            {activeDropdown === item.page && (
                                                <motion.div
                                                    {...dropdownVariants}
                                                    className='absolute top-full left-0 rounded-lg min-w-[160px] py-2 z-50'>
                                                    <div className='rounded-lg bg-surface-2 shadow-xl overflow-hidden'>
                                                        {item.categories.map((cat) => (
                                                            <Link
                                                                key={cat.value}
                                                                to={`/${item.mediaType}/${cat.value}`}
                                                                className='block px-3.5 py-2.5 text-sm text-zinc-400 hover:bg-surface-3 hover:text-zinc-200 transition-colors'>
                                                                {cat.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                :   <li key={i}>
                                        <NavLink
                                            to={item.link!}
                                            className='flex items-center gap-2 p-2 mx-2 text-[15px] font-medium capitalize text-zinc-200 hover:text-zinc-100 transition-colors'>
                                            {item.page}
                                        </NavLink>
                                    </li>
                            )}
                        </ul>
                    </div>

                    {/* desktop search input */}
                    <div
                        className='relative hidden md:flex items-center w-full sm:max-w-[256px] lg:max-w-xs'
                        ref={searchRef}>
                        <form onSubmit={desktop.handleSubmit} className='relative w-full'>
                            <button
                                type='button'
                                aria-label='Toggle search'
                                className='absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors'
                                onClick={() => desktop.setIsOpen(!desktop.isOpen)}>
                                {desktop.isLoading ?
                                    <Loader2 size={22} className='animate-spin' />
                                :   <Search size={20} />}
                            </button>
                            <input
                                type='text'
                                value={desktop.query}
                                onChange={(e) => desktop.setQuery(e.target.value)}
                                onFocus={() => desktop.setIsOpen(true)}
                                placeholder='Search...'
                                className='pl-11 w-full pr-4 py-2 placeholder:text-xs placeholder:font-medium placeholder:text-zinc-500 bg-transparent border border-zinc-200/25 focus:outline-none text-zinc-100 text-sm rounded-full'
                            />
                        </form>

                        {/* desktop search results */}
                        {desktop.isOpen && desktop.query.trim() && (
                            <div className='absolute top-full mt-2 w-full bg-surface-2 rounded-xl shadow-xl max-h-96 overflow-y-auto'>
                                <SearchResults
                                    results={desktop.results}
                                    isLoading={desktop.isLoading}
                                    query={desktop.query}
                                    onResultClick={desktop.handleResultClick}
                                    maxResults={8}
                                    viewAllLink={`/search?query=${encodeURIComponent(desktop.query)}`}
                                    onViewAll={desktop.reset}
                                />
                            </div>
                        )}
                    </div>

                    {/* mobile icon */}
                    <div className='flex md:hidden items-center gap-5'>
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className='text-zinc-300'
                            aria-label='Search'>
                            <Search size={22} />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='text-zinc-300'
                            aria-label='Toggle menu'>
                            {isMobileMenuOpen ?
                                <X size={22} className='relative z-50' />
                            :   <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* mobile menu */}
                {isMobileMenuOpen && (
                    <div className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 overflow-hidden'>
                        <ul className='flex flex-col items-center justify-center h-dvh space-y-2'>
                            {menu.map((item, i) =>
                                item.hasDropdown && item.categories ?
                                    <li key={i}>
                                        <button
                                            onClick={() =>
                                                setMobileActiveDropdown(
                                                    mobileActiveDropdown === item.page ? null : item.page
                                                )
                                            }
                                            className='w-full text-center px-5 py-2 text-lg font-medium capitalize text-zinc-200 flex items-center justify-center gap-2'>
                                            {item.page}
                                            <ChevronDown
                                                size={18}
                                                strokeWidth={2.5}
                                                className={`transition-transform duration-200 ${mobileActiveDropdown === item.page ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {mobileActiveDropdown === item.page && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className='space-y-1 overflow-hidden'>
                                                    {item.categories.map((cat) => (
                                                        <Link
                                                            key={cat.value}
                                                            to={`/${item.mediaType}/${cat.value}`}
                                                            onClick={closeMobileMenu}
                                                            className='block px-8 py-2 text-base font-medium text-center text-zinc-400 hover:text-zinc-100 transition-colors'>
                                                            {cat.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                :   <li key={i}>
                                        <NavLink
                                            to={item.link!}
                                            onClick={closeMobileMenu}
                                            className='block px-5 py-2.5 text-lg font-medium capitalize text-zinc-200 transition-colors'>
                                            {item.page}
                                        </NavLink>
                                    </li>
                            )}
                        </ul>
                    </div>
                )}
            </nav>

            {/* mobile search modal */}
            {isMobileSearchOpen && (
                <div className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col pt-20 px-4'>
                    <div className='w-full max-w-md mx-auto'>
                        <form onSubmit={mobile.handleSubmit}>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={mobile.query}
                                    onChange={(e) => mobile.setQuery(e.target.value)}
                                    placeholder='Find movies and tv shows'
                                    autoFocus
                                    className='w-full pl-5 pr-12 py-4 bg-surface-2 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-full focus:outline-none text-sm placeholder:text-sm'
                                />
                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsMobileSearchOpen(false);
                                        mobile.reset();
                                    }}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-100 transition-colors'
                                    aria-label='Close search'>
                                    <X size={22} />
                                </button>
                            </div>
                        </form>

                        {mobile.query.trim() && (
                            <div className='mt-4 bg-surface-2 rounded-2xl border border-zinc-800 max-h-[60vh] overflow-y-auto'>
                                <SearchResults
                                    results={mobile.results}
                                    isLoading={mobile.isLoading}
                                    query={mobile.query}
                                    onResultClick={mobile.handleResultClick}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
