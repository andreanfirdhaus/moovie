import { useRef, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X, Loader2, ChevronDown, UserRound, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { menu } from '@/constants/nav-menu';
import { Button } from '@/components/ui/button';
import { useNavSearch } from '@/components/layout/navbar/useNavSearch';
import { SearchResults } from './search-results';
import { useAuth } from '@/features/auth/context';

const dropdownVariants = {
    initial: { opacity: 0, y: -4, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -4, scale: 0.98 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const { user, profile, signOut } = useAuth();
    const accountRef = useRef<HTMLDivElement>(null);
    const displayName =
        profile?.username ||
        user?.user_metadata?.username ||
        user?.user_metadata?.full_name ||
        user?.email?.split('@')[0] ||
        'Account';
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || '/assets/avatar.png';

    const searchRef = useRef<HTMLDivElement>(null);

    const desktop = useNavSearch();
    const mobile = useNavSearch(isMobileSearchOpen);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                desktop.setIsOpen(false);
            }
            if (accountRef.current && !accountRef.current.contains(e.target as Node)) setIsAccountOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [desktop]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileActiveDropdown(null);
    };

    const supabaseSignOut = async () => {
        await signOut();
        setIsAccountOpen(false);
    };

    return (
        <header className='absolute w-full top-0 z-20'>
            <nav className='relative px-4 sm:px-6 py-4'>
                <div className='flex items-center justify-between space-x-4'>
                    <div className='flex items-center space-x-16'>
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
                                            className='mx-2 text-sm capitalize text-foreground-secondary hover:text-foreground hover:no-underline hover:bg-surface-hover px-3 py-2'>
                                            {item.page}
                                        </Button>

                                        <AnimatePresence>
                                            {activeDropdown === item.page && (
                                                <motion.div
                                                    {...dropdownVariants}
                                                    className='absolute top-full left-0 rounded-lg min-w-[160px] py-2 z-50'>
                                                    <div className='rounded-lg bg-surface-overlay border border-border shadow-md overflow-hidden'>
                                                        {item.categories.map((cat) => (
                                                            <Link
                                                                key={cat.value}
                                                                to={`/${item.mediaType}/${cat.value}`}
                                                                className='block px-3.5 py-2.5 text-sm text-foreground-secondary hover:bg-surface-hover hover:text-foreground transition-colors'>
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
                                            className='mx-2 flex items-center gap-2 p-2 text-sm font-medium capitalize text-foreground-secondary transition-colors hover:text-foreground'>
                                            {item.page}
                                        </NavLink>
                                    </li>
                            )}
                        </ul>
                    </div>

                    <div className='flex items-center gap-4'>
                        <button
                            type='button'
                            onClick={() => setIsDesktopSearchOpen(true)}
                            className='hidden md:flex items-center justify-center text-foreground-secondary transition-colors hover:text-foreground'
                            aria-label='Open search'>
                            {desktop.isLoading ?
                                <Loader2 size={22} className='animate-spin' />
                            :   <Search size={22} />}
                        </button>

                        <div ref={accountRef} className='relative hidden md:block'>
                            {user ?
                                <Button
                                    variant='outline'
                                    rounded='full'
                                    onClick={() => setIsAccountOpen((open) => !open)}
                                    aria-expanded={isAccountOpen}
                                    className='h-12 px-1.5 pr-3 text-sm text-foreground border-white/10 bg-transparent hover:border-white/40 hover:bg-white/5'>
                                    <span className='flex size-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5'>
                                        <img src={avatarUrl} alt='' className='size-full object-cover' />
                                    </span>

                                    <span className='max-w-28 truncate'>{displayName}</span>

                                    <ChevronDown
                                        size={16}
                                        strokeWidth={2}
                                        className={`transition-transform ${isAccountOpen ? 'rotate-180' : ''}`}
                                    />
                                </Button>
                            :   <Button
                                    as={Link}
                                    to='/login'
                                    variant='outline'
                                    rounded='full'
                                    leftIcon={
                                        <span className='flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5'>
                                            <UserRound size={18} strokeWidth={1.8} />
                                        </span>
                                    }
                                    rightIcon={<ChevronDown size={16} strokeWidth={2} />}
                                    className='h-12 px-1.5 pr-3 text-sm text-foreground border-white/10 bg-transparent hover:border-white/40 hover:bg-white/5'>
                                    Account
                                </Button>
                            }

                            {user && isAccountOpen && (
                                <div className='absolute right-0 top-full mt-2 w-48 rounded-lg bg-surface-overlay border border-border p-2 shadow-md'>
                                    <Link
                                        to='/profile'
                                        onClick={() => setIsAccountOpen(false)}
                                        className='flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-foreground-secondary hover:bg-surface-hover hover:text-foreground'>
                                        <UserRound size={16} />
                                        Profile
                                    </Link>

                                    <Link
                                        to='/profile#settings'
                                        onClick={() => setIsAccountOpen(false)}
                                        className='flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-foreground-secondary hover:bg-surface-hover hover:text-foreground'>
                                        <Settings size={16} />
                                        Account settings
                                    </Link>

                                    <button
                                        onClick={() => void supabaseSignOut()}
                                        className='flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-danger-text hover:bg-danger-surface'>
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {isDesktopSearchOpen && (
                        <div
                            className='hidden md:flex fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex-col pt-28 px-4'
                            onMouseDown={(e) => {
                                if (e.target === e.currentTarget) {
                                    setIsDesktopSearchOpen(false);
                                    desktop.reset();
                                }
                            }}>
                            <div ref={searchRef} className='w-full max-w-xl mx-auto'>
                                <form onSubmit={desktop.handleSubmit}>
                                    <div className='relative'>
                                        <input
                                            type='text'
                                            value={desktop.query}
                                            onChange={(e) => desktop.setQuery(e.target.value)}
                                            placeholder='Find movies and tv shows'
                                            autoFocus
                                            className='w-full pl-5 pr-12 py-4 bg-surface-base border border-border text-foreground placeholder:text-foreground-disabled rounded-full focus:outline-none focus:border-primary-accent text-sm placeholder:text-sm shadow-lg shadow-black/40'
                                        />

                                        <button
                                            type='button'
                                            onClick={() => {
                                                setIsDesktopSearchOpen(false);
                                                desktop.reset();
                                            }}
                                            className='absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors'
                                            aria-label='Close search'>
                                            <X size={22} />
                                        </button>
                                    </div>
                                </form>

                                {desktop.query.trim() && (
                                    <div className='mt-4 bg-surface-overlay border border-border rounded-2xl max-h-[60vh] overflow-y-auto shadow-xl shadow-black/50'>
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
                        </div>
                    )}

                    {/* mobile icon */}
                    <div className='flex md:hidden items-center gap-5'>
                        <button
                            onClick={() => setIsMobileSearchOpen(true)}
                            className='text-foreground-secondary hover:text-foreground transition-colors'
                            aria-label='Search'>
                            <Search size={22} />
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='text-foreground-secondary hover:text-foreground transition-colors'
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
                            <li>
                                <Link
                                    to={user ? '/profile' : '/login'}
                                    onClick={closeMobileMenu}
                                    className='flex items-center gap-3 rounded-full border border-border bg-surface-elevated px-1.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface-hover'>
                                    {user ?
                                        <span className='flex size-8 items-center justify-center overflow-hidden rounded-full border border-border-subtle'>
                                            <img src={avatarUrl} alt='' className='size-full object-cover' />
                                        </span>
                                    :   <span className='flex size-8 items-center justify-center rounded-full border border-border-subtle bg-surface-raised'>
                                            <UserRound size={16} strokeWidth={1.8} />
                                        </span>
                                    }

                                    <span className='max-w-32 truncate'>{user ? displayName : 'Account'}</span>

                                    <ChevronDown size={15} strokeWidth={2} className='mr-2' />
                                </Link>
                            </li>

                            {menu.map((item, i) =>
                                item.hasDropdown && item.categories ?
                                    <li key={i}>
                                        <button
                                            onClick={() =>
                                                setMobileActiveDropdown(
                                                    mobileActiveDropdown === item.page ? null : item.page
                                                )
                                            }
                                            className='w-full text-center px-5 py-2 text-lg font-medium capitalize text-foreground-secondary flex items-center justify-center gap-2 hover:text-foreground transition-colors'>
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
                                                            className='block px-8 py-2 text-base font-medium text-center text-foreground-muted hover:text-foreground transition-colors'>
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
                                            className='block px-5 py-2.5 text-lg font-medium capitalize text-foreground-secondary hover:text-foreground transition-colors'>
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
                                    className='w-full pl-5 pr-12 py-4 bg-surface-base border border-border text-foreground placeholder:text-foreground-disabled rounded-full focus:outline-none focus:border-primary-accent text-sm placeholder:text-sm shadow-lg shadow-black/40'
                                />
                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsMobileSearchOpen(false);
                                        mobile.reset();
                                    }}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors'
                                    aria-label='Close search'>
                                    <X size={22} />
                                </button>
                            </div>
                        </form>

                        {mobile.query.trim() && (
                            <div className='mt-4 bg-surface-overlay border border-border rounded-2xl max-h-[60vh] overflow-y-auto shadow-xl shadow-black/50'>
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
