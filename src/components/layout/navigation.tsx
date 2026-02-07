import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, X, Loader2 } from 'lucide-react';
import { menu } from '@/constants/menu';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { useSearchMulti } from '@/utils/hooks/queries/useSearch';
import { getMediaType, getMovieTitle, getPosterUrl } from '@/utils/helper/tmdb-helpers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');
    const debouncedMobileSearchQuery = useDebounce(mobileSearchQuery, 300);

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);

    // desktop search query
    const { data: searchData, isLoading: isSearching } = useSearchMulti(debouncedSearchQuery);
    const searchResults = searchData?.results || [];

    // mobile search query
    const { data: mobileSearchData, isLoading: isMobileSearching } = useSearchMulti(
        debouncedMobileSearchQuery,
        1,
        isMobileSearchOpen
    );
    const mobileSearchResults = mobileSearchData?.results || [];

    // close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleMobileSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobileSearchQuery.trim()) {
            navigate(`/discover?q=${encodeURIComponent(mobileSearchQuery)}`);
            setIsMobileSearchOpen(false);
            setMobileSearchQuery('');
        }
    };

    const handleResultClick = (type: string, id: number) => {
        navigate(`/${type}/detail/${id}`);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleMobileResultClick = (type: string, id: number) => {
        navigate(`/${type}/detail/${id}`);
        setIsMobileSearchOpen(false);
        setMobileSearchQuery('');
    };

    return (
        <header className='absolute w-full top-0 z-20'>
            <nav className='relative px-4 sm:px-6 lg:px-12 xl:px-24 py-4 md:py-6'>
                <div className='flex items-center justify-between md:justify-normal space-x-8'>
                    <Link to='/'>
                        <img className='h-5 sm:h-6' src='/assets/logo.png' alt='Moovie' draggable='false' />
                    </Link>

                    <div className='relative hidden md:flex items-center w-full max-w-xs' ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className='relative w-full'>
                            <button
                                type='button'
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen);
                                    if (!isSearchOpen) {
                                        setTimeout(() => {
                                            const input = searchRef.current?.querySelector('input');
                                            input?.focus();
                                        }, 300);
                                    }
                                }}
                                className='text-white hover:text-gray-300 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2'
                                aria-label='Toggle search'>
                                {isSearching ?
                                    <Loader2 size={22} className='animate-spin' />
                                :   <Search size={20} />}
                            </button>

                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchOpen(true)}
                                placeholder='Find movies, series, or cast'
                                className='pl-11 w-full pr-4 py-2 placeholder:text-xs placeholder:font-medium bg-transparent border border-zinc-500 focus:outline-none text-white text-sm rounded-full'
                            />
                        </form>

                        {isSearchOpen && searchQuery.trim() && (
                            <div className='absolute top-full mt-2 w-full bg-black border border-zinc-900 rounded-xl shadow-xl max-h-96 overflow-y-auto'>
                                {isSearching ?
                                    <div className='p-4 text-center text-zinc-400'>
                                        <Loader2 className='animate-spin mx-auto mb-2' size={24} />
                                        <p className='text-sm'>Searching...</p>
                                    </div>
                                : searchResults.length > 0 ?
                                    <div className='py-2'>
                                        {searchResults.slice(0, 8).map((result: any) => (
                                            <button
                                                key={result.id}
                                                onClick={() => handleResultClick(getMediaType(result), result.id)}
                                                className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#0f0f0f] transition-colors text-left'>
                                                <LazyLoadImage
                                                    src={getPosterUrl(result)}
                                                    alt={getMovieTitle(result)}
                                                    className='w-14 h-20 object-cover rounded-sm'
                                                    effect='blur'
                                                />

                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-white font-medium text-[15px] truncate'>
                                                        {getMovieTitle(result)}
                                                    </p>
                                                    <p className='text-zinc-400 text-[13px]'>
                                                        {result.media_type === 'movie' ?
                                                            'Movie'
                                                        : result.media_type === 'tv' ?
                                                            'TV Series'
                                                        :   'Person'}
                                                        {(result.release_date || result.first_air_date) && (
                                                            <span className='ml-1'>
                                                                •{' '}
                                                                {new Date(
                                                                    result.release_date || result.first_air_date
                                                                ).getFullYear()}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}

                                        {searchResults.length > 8 && (
                                            <Link
                                                to={`/discover?q=${encodeURIComponent(searchQuery)}`}
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className='block px-4 py-3 text-center text-[#0957e1] hover:bg-[#0f0f0f] text-sm font-medium'>
                                                View all {searchResults.length} results
                                            </Link>
                                        )}
                                    </div>
                                :   <div className='p-4 text-center text-zinc-400'>
                                        <p className='text-sm'>No results found for &quot;{searchQuery}&quot;</p>
                                    </div>
                                }
                            </div>
                        )}
                    </div>

                    {/* desktop menu */}
                    <ul className='hidden md:flex space-x-4'>
                        {menu.map((item, index) => {
                            if (item.hasDropdown && item.categories) {
                                return (
                                    <li
                                        key={index}
                                        className='relative'
                                        onMouseEnter={() => setActiveDropdown(item.page)}
                                        onMouseLeave={() => setActiveDropdown(null)}>
                                        <button className='p-2 text-[15px] font-medium capitalize transition-colors text-neutral-300 hover:text-white flex items-center gap-1'>
                                            {item.page}
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === item.page && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className='absolute top-full left-0 bg-black border border-zinc-800 rounded-lg shadow-xl min-w-[160px] py-1 z-50'>
                                                    {item.categories.map((category) => (
                                                        <Link
                                                            key={category.value}
                                                            to={`/discover?type=${item.mediaType}&category=${category.value}&sort=${category.sortBy}`}
                                                            className='block px-4 py-2.5 text-sm text-neutral-300 hover:bg-[#0f0f0f] hover:text-white transition-colors'>
                                                            {category.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                );
                            }

                            return (
                                <li key={index}>
                                    <NavLink
                                        to={item.link!}
                                        className={({ isActive }) =>
                                            `text-[15px] font-medium capitalize transition-colors ${isActive ? 'text-[#0957e1]' : 'text-neutral-300'}`
                                        }>
                                        {item.page}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>

                    {/* mobile icons */}
                    <div className='flex md:hidden items-center gap-5'>
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className='text-zinc-300'
                            aria-label='Search'>
                            <Search size={24} />
                        </button>

                        {/* hamburger menu */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='text-zinc-300'
                            aria-label='Toggle menu'>
                            {isMobileMenuOpen ?
                                <X size={24} className='relative z-50' />
                            :   <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* mobile menu dropdown */}
                {isMobileMenuOpen && (
                    <div className='md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 overflow-hidden'>
                        <ul className='flex flex-col items-center justify-center h-dvh space-y-2'>
                            {menu.map((item, index) => {
                                if (item.hasDropdown && item.categories) {
                                    return (
                                        <li key={index} className='w-full max-w-xs'>
                                            <button
                                                onClick={() =>
                                                    setMobileActiveDropdown(
                                                        mobileActiveDropdown === item.page ? null : item.page
                                                    )
                                                }
                                                className='w-full text-center px-5 py-2 text-lg font-medium capitalize transition-colors text-neutral-300 flex items-center justify-center gap-2'>
                                                {item.page}
                                            </button>

                                            <AnimatePresence>
                                                {mobileActiveDropdown === item.page && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className='space-y-1 overflow-hidden'>
                                                        {item.categories.map((category) => (
                                                            <Link
                                                                key={category.value}
                                                                to={`/discover?type=${item.mediaType}&category=${category.value}&sort=${category.sortBy}`}
                                                                onClick={() => {
                                                                    setIsMobileMenuOpen(false);
                                                                    setMobileActiveDropdown(null);
                                                                }}
                                                                className='block px-8 py-2 text-base font-medium text-center text-neutral-400 hover:text-white transition-colors'>
                                                                {category.label}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={index}>
                                        <NavLink
                                            to={item.link!}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-5 py-2.5 text-lg font-medium capitalize transition-colors ${isActive ? 'text-[#0957e1]' : 'text-neutral-300'}`
                                            }>
                                            {item.page}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </nav>

            {/* mobile search modal */}
            {isMobileSearchOpen && (
                <div className='md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col pt-20 px-4'>
                    <div className='w-full max-w-md mx-auto' ref={mobileSearchRef}>
                        <form onSubmit={handleMobileSearchSubmit}>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={mobileSearchQuery}
                                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                                    placeholder='Find movies, series, or cast'
                                    autoFocus
                                    className='w-full pl-5 pr-12 py-4 bg-[#0f0f0f] border border-zinc-900 rounded-full focus:outline-none text-white text-sm placeholder:text-sm'
                                />

                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsMobileSearchOpen(false);
                                        setMobileSearchQuery('');
                                    }}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                                    aria-label='Close search'>
                                    <X size={22} />
                                </button>
                            </div>
                        </form>

                        {/* Mobile Search Results */}
                        {mobileSearchQuery.trim() && (
                            <div className='mt-4 bg-[#0f0f0f] rounded-2xl border border-zinc-900 max-h-[60vh] overflow-y-auto'>
                                {isMobileSearching ?
                                    <div className='p-4 text-center text-zinc-400'>
                                        <Loader2 className='animate-spin mx-auto mb-2' size={24} />
                                        <p className='text-sm'>Searching...</p>
                                    </div>
                                : mobileSearchResults.length > 0 ?
                                    <div className='py-2'>
                                        {mobileSearchResults.map((result: any) => (
                                            <button
                                                key={result.id}
                                                onClick={() => handleMobileResultClick(getMediaType(result), result.id)}
                                                className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-left'>
                                                <LazyLoadImage
                                                    src={getPosterUrl(result)}
                                                    alt={getMovieTitle(result)}
                                                    className='w-14 h-20 object-cover rounded'
                                                    effect='blur'
                                                />

                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-white font-medium text-sm truncate'>
                                                        {getMovieTitle(result)}
                                                    </p>
                                                    <p className='text-zinc-400 text-xs'>
                                                        {result.media_type === 'movie' ?
                                                            'Movie'
                                                        : result.media_type === 'tv' ?
                                                            'TV Series'
                                                        :   'Person'}
                                                        {(result.release_date || result.first_air_date) && (
                                                            <span className='ml-1'>
                                                                •{' '}
                                                                {new Date(
                                                                    result.release_date || result.first_air_date
                                                                ).getFullYear()}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                :   <div className='p-4 text-center text-zinc-400'>
                                        <p className='text-sm'>No results found for &quot;{mobileSearchQuery}&quot;</p>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
