import { useRef, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ChevronDown, UserRound, LogOut, Home, Film, Tv, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { menu } from '@/constants/nav-menu';
import { Button } from '@/components/ui/button';
import { LanguageDropdown } from './language-dropdown';
import { useAuth } from '@/context/authContext';
import { NavSearch, MobileSearchModal } from './search';

export default function Navbar() {
    const { t } = useTranslation();
    const [isAccountOpenDesktop, setIsAccountOpenDesktop] = useState(false);
    const [isAccountOpenMobile, setIsAccountOpenMobile] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const { user, profile, signOut } = useAuth();
    const accountRefDesktop = useRef<HTMLDivElement>(null);
    const accountRefMobile = useRef<HTMLDivElement>(null);

    const displayName =
        profile?.username ||
        user?.user_metadata?.username ||
        user?.user_metadata?.full_name ||
        user?.email?.split('@')[0] ||
        t('nav.account');
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || '/assets/avatar.png';
    const userEmail = user?.email || '';

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (accountRefDesktop.current && !accountRefDesktop.current.contains(e.target as Node)) {
                setIsAccountOpenDesktop(false);
            }
            if (accountRefMobile.current && !accountRefMobile.current.contains(e.target as Node)) {
                setIsAccountOpenMobile(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const supabaseSignOut = async () => {
        await signOut();
        setIsAccountOpenDesktop(false);
        setIsAccountOpenMobile(false);
    };

    const getNavLabel = (page: string) => {
        const key = page.toLowerCase().replace(/\s+/g, '');
        if (key === 'home') return t('nav.home');
        if (key === 'movies') return t('nav.movies');
        if (key === 'tvseries' || key === 'tv') return t('nav.tv');
        if (key === 'discover') return t('nav.discover');
        return page;
    };

    const bottomNavMenu = [
        { label: t('nav.home'), path: '/', icon: Home, isAction: false },
        { label: t('nav.movies'), path: '/movies', icon: Film, isAction: false },
        { label: t('nav.tv'), path: '/tv', icon: Tv, isAction: false },
        { label: t('nav.search') || 'Search', path: '#search', icon: Search, isAction: true },
        { label: t('nav.discover'), path: '/discover', icon: Compass, isAction: false },
    ];

    return (
        <>
            <header className='absolute top-0 z-20 w-full'>
                <nav className='relative px-4 sm:px-6 py-7 lg:py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-8'>
                            <Link to='/' aria-label='Moovie home'>
                                <img className='h-5 sm:h-6' src='/assets/logo.png' alt='Moovie' draggable='false' />
                            </Link>

                            <ul className='hidden lg:flex items-center gap-1' aria-label='Main navigation'>
                                {menu.map((item, i) => (
                                    <li key={i}>
                                        <NavLink
                                            to={item.link}
                                            className={({ isActive }) =>
                                                `mx-0.5 px-3 py-2 text-sm font-medium capitalize rounded-md text-foreground hover:bg-white/10 transition-colors ${
                                                    isActive ? 'bg-white/10' : ''
                                                }`
                                            }>
                                            {getNavLabel(item.page)}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* desktop user navigation */}
                        <div className='hidden lg:flex items-center gap-3'>
                            {/* expandable search */}
                            <NavSearch />

                            <div ref={accountRefDesktop} className='relative'>
                                {user ?
                                    <Button
                                        variant='outline'
                                        rounded='full'
                                        onClick={() => setIsAccountOpenDesktop((open) => !open)}
                                        aria-expanded={isAccountOpenDesktop}
                                        className='h-11 border-white/10 bg-transparent px-1 pr-3 text-sm text-foreground hover:border-white/40 hover:bg-white/5'>
                                        <span className='flex size-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5'>
                                            <img src={avatarUrl} alt='' className='size-full object-cover' />
                                        </span>
                                        <span className='max-w-28 truncate'>{displayName}</span>
                                        <ChevronDown
                                            size={16}
                                            strokeWidth={2}
                                            className={`transition-transform ${isAccountOpenDesktop ? 'rotate-180' : ''}`}
                                        />
                                    </Button>
                                :   <Button
                                        as={Link}
                                        to='/login'
                                        variant='outline'
                                        rounded='full'
                                        leftIcon={
                                            <span className='flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5'>
                                                <UserRound size={18} strokeWidth={1.8} />
                                            </span>
                                        }
                                        className='h-11 border-white/10 bg-transparent px-1 pr-5 text-sm text-foreground hover:border-white/40 hover:bg-white/5'>
                                        {t('nav.account')}
                                    </Button>
                                }

                                {/* desktop user menu dropdown */}
                                {isAccountOpenDesktop && (
                                    <div className='absolute right-0 top-full mt-2 w-64 rounded-2xl border border-border bg-surface-raised p-2 shadow-2xl z-50'>
                                        {user && (
                                            <Link
                                                to='/profile'
                                                onClick={() => setIsAccountOpenDesktop(false)}
                                                className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors group'>
                                                <img
                                                    src={avatarUrl}
                                                    alt={displayName}
                                                    className='size-11 rounded-full object-cover border border-white/10 flex-shrink-0'
                                                />

                                                <div className='flex flex-col min-w-0 flex-1'>
                                                    <p className='text-sm font-semibold truncate text-foreground'>
                                                        {displayName}
                                                    </p>

                                                    {userEmail && (
                                                        <p className='text-xs text-foreground-muted truncate leading-tight mt-0.5'>
                                                            {userEmail}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        )}

                                        <div className='pt-1'>
                                            <LanguageDropdown position='right-side' />
                                        </div>

                                        {user && (
                                            <div className='pt-1'>
                                                <Button
                                                    onClick={() => void supabaseSignOut()}
                                                    leftIcon={<LogOut size={16} />}
                                                    className='flex w-full justify-start gap-2.5 rounded-xl px-3 py-2 text-sm text-danger-text hover:bg-danger-surface transition-colors'>
                                                    {t('nav.signOut')}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* mobile bottom navigation bar */}
            <div className='fixed bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden'>
                <nav className='flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-2 backdrop-blur-xl shadow-2xl'>
                    {bottomNavMenu.map((item) => {
                        const Icon = item.icon;

                        if (item.isAction) {
                            return (
                                <button
                                    key={item.label}
                                    type='button'
                                    onClick={() => setIsMobileSearchOpen(true)}
                                    className='flex size-11 items-center justify-center rounded-full text-foreground-secondary transition-all duration-200 hover:bg-white/10 hover:text-foreground'
                                    aria-label={item.label}>
                                    <Icon size={20} strokeWidth={2} />
                                </button>
                            );
                        }

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex size-11 items-center justify-center rounded-full transition-all duration-200 ${
                                        isActive ? 'bg-white/20 text-foreground' : (
                                            'text-foreground-secondary hover:bg-white/10 hover:text-foreground'
                                        )
                                    }`
                                }
                                aria-label={item.label}>
                                <Icon size={20} strokeWidth={2} />
                            </NavLink>
                        );
                    })}

                    <div ref={accountRefMobile} className='relative'>
                        <button
                            type='button'
                            onClick={() => setIsAccountOpenMobile((open) => !open)}
                            aria-expanded={isAccountOpenMobile}
                            className='flex size-11 items-center justify-center rounded-full text-foreground-secondary transition-all duration-200 hover:bg-white/10 hover:text-foreground'
                            aria-label='Account Menu'>
                            {user ?
                                <span className='flex size-8 items-center justify-center overflow-hidden rounded-full border border-white/20'>
                                    <img src={avatarUrl} alt='' className='size-full object-cover' />
                                </span>
                            :   <span className='flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5'>
                                    <UserRound size={18} strokeWidth={1.8} />
                                </span>
                            }
                        </button>

                        {/* mobile bottom bar dropdown menu */}
                        {isAccountOpenMobile && (
                            <div className='absolute bottom-full right-0 mb-3 w-64 rounded-2xl border border-border bg-surface-raised p-2 shadow-2xl z-50'>
                                {user ?
                                    <Link
                                        to='/profile'
                                        onClick={() => setIsAccountOpenMobile(false)}
                                        className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover transition-colors group'>
                                        <img
                                            src={avatarUrl}
                                            alt={displayName}
                                            className='size-11 rounded-full object-cover border border-white/10 flex-shrink-0'
                                        />
                                        <div className='flex flex-col min-w-0 flex-1'>
                                            <p className='text-sm font-semibold truncate text-foreground'>
                                                {displayName}
                                            </p>
                                            {userEmail && (
                                                <p className='text-xs text-foreground-muted truncate leading-tight mt-0.5'>
                                                    {userEmail}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                :   <Link
                                        to='/login'
                                        onClick={() => setIsAccountOpenMobile(false)}
                                        className='flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors'>
                                        <UserRound size={16} />
                                        {t('nav.account')} / Login
                                    </Link>
                                }

                                <div className='pt-1'>
                                    <LanguageDropdown position='top-side' />
                                </div>

                                {user && (
                                    <div className='pt-1'>
                                        <Button
                                            onClick={() => void supabaseSignOut()}
                                            leftIcon={<LogOut size={16} />}
                                            className='flex w-full justify-start gap-2.5 rounded-xl px-3 py-2 text-sm text-danger-text hover:bg-danger-surface transition-colors'>
                                            {t('nav.signOut')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* mobile search overlay */}
            <MobileSearchModal isOpen={isMobileSearchOpen} onClose={() => setIsMobileSearchOpen(false)} />
        </>
    );
}
