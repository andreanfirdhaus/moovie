import type { User } from '@supabase/supabase-js';

interface ProfileHeaderProps {
    user: User;
    displayName: string;
    avatarUrl: string;
    onEditClick?: () => void;
}

export function ProfileHeader({ user, displayName, avatarUrl }: ProfileHeaderProps) {
    return (
        <header className='flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
            <div className='flex items-center gap-4'>
                <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
                    <div className='flex items-center gap-4'>
                        <img
                            src={avatarUrl}
                            alt={`${displayName} avatar`}
                            className='size-20 rounded-full object-cover border border-white/10 shadow-md'
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/avatar.png';
                            }}
                        />

                        <div>
                            <h1 className='text-2xl font-bold text-foreground mb-1'>{displayName}</h1>
                            <p className='text-sm text-foreground-muted'>{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
