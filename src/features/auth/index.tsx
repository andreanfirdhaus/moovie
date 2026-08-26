import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleAlert, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from './context';
import { isSupabaseConfigured } from '@/config/supabase';
import { useTrendingMovies } from '../home/hooks/useMovies.query';
import { Marquee } from '@/features/auth/components/marquee';

type AuthMode = 'login' | 'register' | 'forgot' | 'reset';

export default function AuthPage({ mode }: { mode: AuthMode }) {
    const navigate = useNavigate();
    const { data: trendingMovies = [] } = useTrendingMovies();

    const { signIn, signInWithGoogle, signUp, resetPassword, updatePassword } = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

    const title =
        mode === 'login' ? 'Welcome back'
        : mode === 'register' ? 'Create your account'
        : mode === 'reset' ? 'Choose a new password'
        : 'Reset your password';
    const submitLabel =
        mode === 'login' ? 'Sign in'
        : mode === 'register' ? 'Create account'
        : mode === 'reset' ? 'Update password'
        : 'Send reset link';

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        const result =
            mode === 'login' ? await signIn(email, password)
            : mode === 'register' ? await signUp(email, password, username.trim())
            : mode === 'reset' ? await updatePassword(password)
            : await resetPassword(email);

        setIsSubmitting(false);
        if (result.error) {
            setError(result.error.message);
            return;
        }

        if (mode === 'register' && 'needsConfirmation' in result && result.needsConfirmation) {
            setMessage('Check your email to confirm your account.');
        } else if (mode === 'forgot') {
            setMessage('If an account exists, a reset link is on its way.');
        } else if (mode === 'reset') {
            setMessage('Your password was updated. You can sign in now.');
            navigate('/login');
        } else {
            navigate('/profile');
        }
    };

    const continueWithGoogle = async () => {
        setError('');
        setIsGoogleSubmitting(true);
        const result = await signInWithGoogle();
        if (result.error) {
            setError(result.error.message);
            setIsGoogleSubmitting(false);
        }
    };

    return (
        <main className='min-h-screen bg-background'>
            <header className='absolute top-[3.5px] md:top-3 left-0 z-40 w-full'>
                <div className='relative px-4 sm:px-6 py-5 md:py-6'>
                    <Link to='/' aria-label='Moovie home'>
                        <img className='h-5 sm:h-6' src='/assets/logo.png' alt='Moovie' draggable='false' />
                    </Link>
                </div>
            </header>

            <div className='grid min-h-screen w-full overflow-hidden bg-black md:grid-cols-[55%_45%]'>
                {/* left */}
                <div className='relative hidden min-h-screen overflow-hidden md:block'>
                    <Marquee movies={trendingMovies} />
                </div>
                {/* <div
                    className="relative hidden md:flex min-h-screen flex-col justify-between overflow-hidden bg-cover bg-center px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10 xl:px-24"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=85')",
                    }}
                >
                    <div className='absolute inset-0 bg-black/45' />
                </div> */}

                {/* right */}
                <div className='flex items-center bg-black px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-10 xl:px-24'>
                    <div className='w-full'>
                        <h2 className='text-2xl font-semibold text-zinc-100'>{title}</h2>

                        <p className='mt-2 text-sm text-zinc-400'>
                            {mode === 'forgot' ?
                                'Enter your email and we will send a secure recovery link.'
                            : mode === 'reset' ?
                                'Use a password you do not use on another site.'
                            :   'Sign in to keep your personal collection synced.'}
                        </p>

                        {!isSupabaseConfigured && (
                            <div className='mt-6 flex gap-2 rounded-lg bg-yellow-950/50 p-3 text-xs text-yellow-300'>
                                <CircleAlert size={16} className='shrink-0' />
                                Add Supabase environment variables to enable accounts.
                            </div>
                        )}

                        {error && <div className='mt-6 rounded-lg bg-red-950/60 p-3 text-sm text-red-300'>{error}</div>}

                        {message && (
                            <div className='mt-6 flex gap-2 rounded-lg bg-green-950/60 p-3 text-sm text-green-300'>
                                <CheckCircle2 size={16} />
                                {message}
                            </div>
                        )}

                        <form onSubmit={submit} className='mt-8 space-y-4'>
                            {/* username */}
                            {mode === 'register' && (
                                <div className='relative'>
                                    <input
                                        id='username'
                                        name='username'
                                        required
                                        minLength={3}
                                        maxLength={30}
                                        pattern='^[a-zA-Z0-9_]+$'
                                        title='Use 3-30 letters, numbers, or underscores.'
                                        type='text'
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        placeholder=' '
                                        autoComplete='username'
                                        className='peer w-full rounded-xl bg-surface px-5 py-3.5 text-sm text-zinc-100 outline-none ring-1 ring-inset ring-border  transition-all duration-300 focus:ring-primary'
                                    />

                                    <label
                                        htmlFor='username'
                                        className='pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-300 transition-all duration-300 ease-out peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-surface peer-focus:px-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-xs'>
                                        Username
                                    </label>
                                </div>
                            )}

                            {/* email */}
                            {mode !== 'reset' && (
                                <div className='relative'>
                                    <input
                                        id='email'
                                        name='email'
                                        required
                                        type='email'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder=' '
                                        autoComplete='email'
                                        className='peer w-full rounded-xl bg-surface px-5 py-3.5 text-sm text-zinc-100 outline-none ring-1 ring-inset ring-border transition-all duration-300 focus:ring-primary'
                                    />

                                    <label
                                        htmlFor='email'
                                        className='pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-300 transition-all duration-300 ease-out peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-surface peer-focus:px-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-xs'>
                                        Email
                                    </label>
                                </div>
                            )}

                            {/* password */}
                            {mode !== 'forgot' && (
                                <div className='relative'>
                                    <input
                                        id='password'
                                        name='password'
                                        required
                                        minLength={6}
                                        type='password'
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder=' '
                                        autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                                        className='peer w-full rounded-xl bg-surface px-5 py-3.5 text-sm text-zinc-100 outline-none ring-1 ring-inset ring-border transition-all duration-300 focus:ring-primary'
                                    />

                                    <label
                                        htmlFor='password'
                                        className='pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-zinc-300 transition-all duration-300 ease-out peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-surface peer-focus:px-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:text-xs'>
                                        Password
                                    </label>
                                </div>
                            )}

                            {/* forgot password */}
                            {mode === 'login' && (
                                <div className='flex justify-end'>
                                    <Link
                                        to='/forgot-password'
                                        className='text-sm text-zinc-400 transition-colors hover:text-zinc-100'>
                                        Forgot password?
                                    </Link>
                                </div>
                            )}

                            {/* submit */}
                            <div className='pt-2'>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    rounded='full'
                                    className='w-full'
                                    isLoading={isSubmitting}>
                                    {submitLabel}
                                </Button>
                            </div>
                        </form>

                        {/* google auth */}
                        {(mode === 'login' || mode === 'register') && (
                            <>
                                <div className='my-6 flex items-center gap-3 text-sm text-zinc-500'>
                                    <span className='h-px flex-1 bg-border' />
                                    <span>Or</span>
                                    <span className='h-px flex-1 bg-border' />
                                </div>

                                <Button
                                    type='button'
                                    variant='outline'
                                    rounded='full'
                                    className='w-full border-zinc-100 hover:border-none bg-transparent text-zinc-100 transition-colors hover:bg-zinc-100 hover:text-black'
                                    isLoading={isGoogleSubmitting}
                                    onClick={() => void continueWithGoogle()}>
                                    <span className='flex size-5 items-center justify-center'>
                                        <svg
                                            version='1.1'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 48 48'
                                            className='block size-5'
                                            aria-hidden='true'>
                                            <path
                                                fill='#EA4335'
                                                d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
                                            />
                                            <path
                                                fill='#4285F4'
                                                d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
                                            />
                                            <path
                                                fill='#FBBC05'
                                                d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
                                            />
                                            <path
                                                fill='#34A853'
                                                d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
                                            />
                                            <path fill='none' d='M0 0h48v48H0z' />
                                        </svg>
                                    </span>
                                    Continue with Google
                                </Button>

                                {/* footer (login & register) */}
                                {mode === 'login' && (
                                    <div className='mt-6 text-center text-sm text-zinc-400'>
                                        Don&apos;t have an account?{' '}
                                        <Link
                                            to='/register'
                                            className='font-medium text-zinc-100 transition-colors hover:text-zinc-400'>
                                            Sign up
                                        </Link>
                                    </div>
                                )}

                                {mode === 'register' && (
                                    <div className='mt-6 text-center text-sm text-zinc-400'>
                                        Already have an account?{' '}
                                        <Link
                                            to='/login'
                                            className='font-medium text-zinc-100 transition-colors hover:text-zinc-400'>
                                            Sign in
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
