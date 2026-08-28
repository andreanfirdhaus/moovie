import { Copyright } from 'lucide-react';

export default function Footer() {
    return (
        <footer className='px-4 sm:px-6 pt-6 pb-8 flex items-center justify-start'>
            <p className='flex items-center space-x-1 text-sm text-foreground-muted font-medium'>
                <Copyright size={14} strokeWidth={2.5} />
                <span>2026 Moovie. All rights reserved.</span>
            </p>
        </footer>
    );
}
