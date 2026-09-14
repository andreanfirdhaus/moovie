import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/authContext';
import { getUserMedia } from './hooks/getUserMedia';
import { MediaHubHeroBanner } from '@/components/media/banner';
import Loading from '@/components/ui/spinner';
import { ProfileHeader } from './components/profile-header';
import { ProfileTabs } from './components/profile-tabs';
import { MediaTabContent } from './components/media-tab-content';
import { SettingsForm } from './components/settings-form';
import { AccountNotice } from './components/account-notice';
import { useAccountSettings } from './hooks/useAccountSettings';

type ProfileTab = 'watchlist' | 'favorite' | 'settings';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user, profile, isLoading: authLoading, deleteAccount, signOut } = useAuth();

    // 1. tab state synchronized with URL query parameter (?tab=watchlist|favorite|settings)
    const currentTabParam = searchParams.get('tab') as ProfileTab | null;
    const activeTab: ProfileTab =
        currentTabParam === 'favorite' || currentTabParam === 'settings' ? currentTabParam : 'watchlist';

    const setActiveTab = (tab: ProfileTab) => {
        setSearchParams({ tab }, { replace: true });
    };

    // 2. settings form state and mutations
    const {
        formData,
        handleFieldChange,
        handleAvatarChange,
        handleSaveChanges,
        isSaving,
        accountMessage,
        accountError,
    } = useAccountSettings(user, profile);

    // 3. media query (Watchlist / Favorite)
    const isMediaTab = activeTab === 'watchlist' || activeTab === 'favorite';
    const { data: mediaItems = [], isLoading: isMediaLoading } = useQuery({
        queryKey: ['user-media', user?.id, activeTab],
        queryFn: async () => {
            if (!user || !isMediaTab) return [];
            const { data } = await getUserMedia(user.id, activeTab);
            return data;
        },
        enabled: !!user && isMediaTab,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login', { replace: true });
        }
    }, [authLoading, navigate, user]);

    const handleDeleteAccount = async () => {
        if (!window.confirm('Delete your account and all saved media? This cannot be undone.')) {
            return;
        }

        const { error } = await deleteAccount();
        if (error) {
            console.error('Delete error:', error);
        } else {
            await signOut();
            navigate('/');
        }
    };

    if (authLoading || !user) return <Loading />;

    const displayName =
        profile?.username ||
        user?.user_metadata?.username ||
        user?.user_metadata?.full_name ||
        user?.email?.split('@')[0] ||
        'Account';
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || '/assets/avatar.png';

    return (
        <main className='min-h-screen pb-20'>
            <MediaHubHeroBanner gradientVariant={activeTab === 'settings' ? 'settings' : 'profile'} />

            <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 xl:px-20 -mt-20'>
                <ProfileHeader
                    user={user}
                    displayName={displayName}
                    avatarUrl={avatarUrl}
                    onEditClick={() => setActiveTab('settings')}
                />

                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    watchlistCount={activeTab === 'watchlist' ? mediaItems.length : undefined}
                    favoriteCount={activeTab === 'favorite' ? mediaItems.length : undefined}
                />

                <div className='mt-8'>
                    {activeTab === 'settings' ?
                        <div>
                            {(accountMessage || accountError) && (
                                <div className='mb-8'>
                                    <AccountNotice message={accountMessage} error={accountError} />
                                </div>
                            )}

                            <SettingsForm
                                formData={formData}
                                onFieldChange={handleFieldChange}
                                onAvatarChange={handleAvatarChange}
                                onSubmit={handleSaveChanges}
                                onDeleteAccount={handleDeleteAccount}
                                isSaving={isSaving}
                                avatarUrl={avatarUrl}
                            />
                        </div>
                    :   <MediaTabContent items={mediaItems} isLoading={isMediaLoading} activeKind={activeTab} />}
                </div>
            </div>
        </main>
    );
}
