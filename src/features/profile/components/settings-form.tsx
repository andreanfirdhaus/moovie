import { Camera, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsCard } from './settings-card';

interface SettingsFormProps {
    formData: {
        fullName: string;
        username: string;
        email: string;
        password: string;
    };
    onFieldChange: (field: keyof SettingsFormProps['formData'], value: string) => void;
    onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onDeleteAccount: () => void;
    isSaving: boolean;
    avatarUrl: string;
}

export function SettingsForm({
    formData,
    onFieldChange,
    onAvatarChange,
    onSubmit,
    onDeleteAccount,
    isSaving,
    avatarUrl,
}: SettingsFormProps) {
    return (
        <form onSubmit={onSubmit}>
            {/* 2 Column Grid */}
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* LEFT COLUMN */}
                <div className='space-y-6'>
                    {/* Profile Photo */}
                    <SettingsCard title='Profile photo' description='Use a JPG, PNG, or WebP image.'>
                        <div className='flex items-center gap-4'>
                            <img
                                src={avatarUrl}
                                alt='Profile preview'
                                className='h-12 w-12 rounded-full object-cover'
                            />
                            <label className='inline-flex cursor-pointer items-center gap-2 rounded-md bg-surface-elevated border border-border-subtle px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors'>
                                <Camera size={16} /> Change avatar
                                <input
                                    type='file'
                                    accept='image/png,image/jpeg,image/webp'
                                    onChange={onAvatarChange}
                                    className='sr-only'
                                />
                            </label>
                        </div>
                    </SettingsCard>

                    {/* Username & Display Name */}
                    <SettingsCard title='Username and display name'>
                        <input
                            required
                            minLength={3}
                            maxLength={30}
                            pattern='^[a-zA-Z0-9_]+$'
                            value={formData.username}
                            onChange={(e) => onFieldChange('username', e.target.value)}
                            placeholder='Username'
                            className='w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                        />
                        <input
                            value={formData.fullName}
                            onChange={(e) => onFieldChange('fullName', e.target.value)}
                            placeholder='Your name'
                            className='mt-4 w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                        />
                    </SettingsCard>
                </div>

                {/* RIGHT COLUMN */}
                <div className='space-y-6'>
                    {/* Email Address */}
                    <SettingsCard title='Email address'>
                        <input
                            required
                            type='email'
                            value={formData.email}
                            onChange={(e) => onFieldChange('email', e.target.value)}
                            className='w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                        />
                    </SettingsCard>

                    {/* Password */}
                    <SettingsCard title='Password'>
                        <p className='text-xs text-foreground-muted mb-4'>
                            Leave empty if you don&apos;t want to change it.
                        </p>
                        <input
                            minLength={6}
                            type='password'
                            value={formData.password}
                            onChange={(e) => onFieldChange('password', e.target.value)}
                            placeholder='New password (optional)'
                            className='w-full rounded-md bg-surface-base border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-disabled outline-none focus:border-primary-accent transition-colors'
                        />
                    </SettingsCard>

                    {/* Delete Account */}
                    <SettingsCard
                        title='Delete account'
                        description='Your account and saved media will be permanently removed.'
                        variant='danger'>
                        <Button
                            type='button'
                            onClick={onDeleteAccount}
                            variant='danger'
                            rounded='md'
                            className='w-full'>
                            <Trash2 size={16} /> Delete account
                        </Button>
                    </SettingsCard>
                </div>
            </div>

            {/* Submit Button - Full Width at Bottom */}
            <div className='mt-8 flex justify-end'>
                <Button type='submit' variant='secondary' rounded='md' isLoading={isSaving} className='min-w-[200px]'>
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
