import { Link } from 'react-router-dom';
import { Copyright } from 'lucide-react';

export default function Footer() {
    return (
        <footer className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-6 flex items-center justify-between'>
            <p className='flex items-center space-x-1 text-sm text-zinc-400 font-medium'>
                <Copyright size={14} strokeWidth={2.5} />
                <span>
                    2026 Moovie. Powered by{' '}
                    <Link
                        to='https://www.themoviedb.org/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:bg-gradient-to-r hover:from-[#90cea1] hover:to-[#01b4e4] hover:bg-clip-text hover:text-transparent'>
                        TMDB
                    </Link>
                </span>
            </p>

            <Link
                to='https://developer.themoviedb.org/reference/getting-started'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-zinc-400 font-medium'>
                Guide
            </Link>
        </footer>
    );
}
