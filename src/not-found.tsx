import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main className='fixed inset-0 z-20 flex items-center justify-center bg-background'>
            <div className='flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-6'>
                <img
                    className='h-8 w-auto sm:h-10 md:h-16'
                    src='/assets/not-found.png'
                    alt='Page not found illustration'
                    draggable='false'
                    loading='eager'
                />

                <p className='sm:text-lg text-foreground-muted font-medium'>
                    The page you&apos;re looking for doesn&apos;t exist. Back to{' '}
                    <Link to='/' className='text-primary-accent hover:underline transition-colors'>
                        home.
                    </Link>
                </p>
            </div>
        </main>
    );
}
