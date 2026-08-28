import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Bookmark, Heart, Camera, Save, Trash2 } from 'lucide-react';
import { useAuth } from '@/features/auth/context';
import { getUserMedia } from '@/features/library/use-media-library';
import type { LibraryKind, UserMedia } from '@/features/library/types';
import { MediaCard } from '@/components/composed/card/media-card';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/spinner';

export default function ProfilePage() {
    const navigate = useNavigate();
    const {
        user,
        profile,
        isLoading: authLoading,
        signOut,
        updateProfile,
        uploadAvatar,
        updateEmail,
        updatePassword,
        deleteAccount,
    } = useAuth();
    const [activeKind, setActiveKind] = useState<LibraryKind>('watchlist');
    const [items, setItems] = useState<UserMedia[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [accountMessage, setAccountMessage] = useState('');
    const [accountError, setAccountError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || '/assets/not-found.png';
    const displayName =
        profile?.username ||
        user?.user_metadata?.username ||
        user?.user_metadata?.full_name ||
        user?.email?.split('@')[0] ||
        'Account';

    useEffect(() => {
        if (!authLoading && !user) navigate('/login', { replace: true });
    }, [authLoading, navigate, user]);

    useEffect(() => {
        if (!user) return;
        setUsername(profile?.username || user.user_metadata?.username || '');
        setFullName(profile?.full_name || user.user_metadata?.full_name || '');
        setNewEmail(user.email || '');
        setIsLoading(true);
        getUserMedia(user.id, activeKind).then(({ data }) => {
            setItems(data);
            setIsLoading(false);
        });
    }, [activeKind, profile, user]);

    const clearAccountNotice = () => {
        setAccountMessage('');
        setAccountError('');
    };

    const saveName = async () => {
        clearAccountNotice();
        setIsSaving(true);
        const { error } = await updateProfile({ username: username.trim(), full_name: fullName.trim() });
        setIsSaving(false);
        if (error) setAccountError(error.message);
        else setAccountMessage('Profile name updated.');
    };

    const saveEmail = async (event: React.FormEvent) => {
        event.preventDefault();
        clearAccountNotice();
        setIsSaving(true);
        const { error } = await updateEmail(newEmail.trim());
        setIsSaving(false);
        if (error) setAccountError(error.message);
        else setAccountMessage('Check your new email to confirm the address change.');
    };

    const savePassword = async (event: React.FormEvent) => {
        event.preventDefault();
        clearAccountNotice();
        setIsSaving(true);
        const { error } = await updatePassword(newPassword);
        setIsSaving(false);
        if (error) setAccountError(error.message);
        else {
            setNewPassword('');
            setAccountMessage('Password updated.');
        }
    };

    const handleAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        clearAccountNotice();
        if (!file.type.startsWith('image/')) {
            setAccountError('Please choose an image file.');
            return;
        }
        setIsSaving(true);
        const { error } = await uploadAvatar(file);
        setIsSaving(false);
        if (error) setAccountError(error.message);
        else setAccountMessage('Avatar updated.');
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Delete your account and all saved media? This cannot be undone.')) return;
        clearAccountNotice();
        setIsSaving(true);
        const { error } = await deleteAccount();
        setIsSaving(false);
        if (error) setAccountError(error.message);
        else navigate('/');
    };

    if (authLoading || !user) return <Loading />;

    return (
        <main className='min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-12 xl:px-24'>
            <div className='mx-auto max-w-7xl'>
                <header className='flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end'>
                    <div className='flex items-center gap-4'>
                        <img
                            src={avatarUrl}
                            alt={`${displayName} avatar`}
                            className='size-16 rounded-full object-cover'
                        />
                        <div>
                            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary-accent'>
                                Your account
                            </p>
                            <h1 className='mt-2 text-3xl font-bold text-foreground'>{displayName}</h1>
                            <p className='mt-2 text-sm text-foreground-muted'>{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => void signOut().then(() => navigate('/'))}
                        className='inline-flex items-center gap-2 self-start text-sm text-foreground-muted hover:text-foreground sm:self-auto transition-colors'>
                        <LogOut size={16} /> Sign out
                    </button>
                </header>

                <div className='mt-8 flex gap-2' role='tablist' aria-label='Collection type'>
                    <button
                        onClick={() => setActiveKind('watchlist')}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${activeKind === 'watchlist' ? 'bg-surface-elevated text-foreground' : 'text-foreground-muted hover:bg-surface-raised hover:text-foreground'}`}>
                        <Bookmark size={16} /> Watchlist
                    </button>
                    <button
                        onClick={() => setActiveKind('favorite')}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${activeKind === 'favorite' ? 'bg-surface-elevated text-foreground' : 'text-foreground-muted hover:bg-surface-raised hover:text-foreground'}`}>
                        <Heart size={16} /> Favorites
                    </button>
                </div>

                {isLoading ?
                    <Loading />
                : items.length > 0 ?
                    <div className='mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6'>
                        {items.map((item) => (
                            <Link key={item.id} to={`/${item.media_type}/${item.media_id}`}>
                                <MediaCard
                                    type={
                                        {
                                            id: item.media_id,
                                            title: item.title,
                                            poster_path: item.poster_path ?? '',
                                            vote_average: item.vote_average ?? 0,
                                            release_date: item.release_date ?? '',
                                        } as never
                                    }
                                />
                            </Link>
                        ))}
                    </div>
                :   <div className='mt-12 rounded-lg bg-surface-raised border border-border-subtle p-10 text-center'>
                        <p className='text-lg font-semibold text-foreground'>Your {activeKind} is empty</p>
                        <p className='mt-2 text-sm text-foreground-muted'>
                            Save something while browsing and it will appear here.
                        </p>
                    </div>
                }

                <section id='settings' className='mt-16 max-w-2xl border-t border-border pt-8'>
                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary-accent'>
                        Account settings
                    </p>
                    <h2 className='mt-2 text-xl font-semibold text-foreground'>Manage your account</h2>

                    {accountError && (
                        <p className='mt-4 rounded-md bg-danger-surface border border-danger-border p-3 text-sm text-danger-text'>
                            {accountError}
                        </p>
                    )}
                    {accountMessage && (
                        <p className='mt-4 rounded-md bg-success-surface border border-success-border p-3 text-sm text-success-text'>
                            {accountMessage}
                        </p>
                    )}

                    <div className='mt-6 space-y-6'>
                        <div className='rounded-lg bg-surface-raised border border-border-subtle p-5'>
                            <h3 className='font-semibold text-foreground'>Profile photo</h3>
                            <p className='mt-1 text-sm text-foreground-muted'>Use a JPG, PNG, or WebP image.</p>
                            <label className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md bg-surface-elevated border border-border-subtle px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors'>
                                <Camera size={16} /> Change avatar
                                <input
                                    type='file'
                                    accept='image/png,image/jpeg,image/webp'
                                    onChange={(event) => void handleAvatar(event)}
                                    className='sr-only'
                                />
                            </label>
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                void saveName();
                            }}
                            className='rounded-lg bg-surface-raised border border-border-subtle p-5'>
                            <h3 className='font-semibold text-foreground'>Username and display name</h3>
                            <input
                                required
                                minLength={3}
                                maxLength={30}
                                pattern='^[a-zA-Z0-9_]+$'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder='Username'
                                className='mt-4 w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                            />
                            <input
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                placeholder='Your name'
                                className='mt-4 w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                            />
                            <Button
                                type='submit'
                                variant='secondary'
                                rounded='md'
                                className='mt-4'
                                isLoading={isSaving}>
                                <Save size={16} /> Save name
                            </Button>
                        </form>
                        <form
                            onSubmit={(event) => void saveEmail(event)}
                            className='rounded-lg bg-surface-raised border border-border-subtle p-5'>
                            <h3 className='font-semibold text-foreground'>Email address</h3>
                            <input
                                required
                                type='email'
                                value={newEmail}
                                onChange={(event) => setNewEmail(event.target.value)}
                                className='mt-4 w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                            />
                            <Button
                                type='submit'
                                variant='secondary'
                                rounded='md'
                                className='mt-4'
                                isLoading={isSaving}>
                                Update email
                            </Button>
                        </form>
                        <form
                            onSubmit={(event) => void savePassword(event)}
                            className='rounded-lg bg-surface-raised border border-border-subtle p-5'>
                            <h3 className='font-semibold text-foreground'>Password</h3>
                            <input
                                required
                                minLength={6}
                                type='password'
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                placeholder='New password'
                                className='mt-4 w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                            />
                            <Button
                                type='submit'
                                variant='secondary'
                                rounded='md'
                                className='mt-4'
                                isLoading={isSaving}>
                                Update password
                            </Button>
                        </form>
                        <div className='rounded-lg bg-danger-surface border border-danger-border p-5'>
                            <h3 className='font-semibold text-danger-text'>Delete account</h3>
                            <p className='mt-1 text-sm text-danger-text/80'>
                                Your account and saved media will be permanently removed.
                            </p>
                            <Button
                                type='button'
                                onClick={() => void handleDeleteAccount()}
                                variant='danger'
                                rounded='md'
                                className='mt-4'
                                isLoading={isSaving}>
                                <Trash2 size={16} /> Delete account
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
