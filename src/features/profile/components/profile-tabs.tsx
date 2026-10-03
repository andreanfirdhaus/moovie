import { Bookmark, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProfileTab = 'watchlist' | 'favorite' | 'settings';

interface ProfileTabsProps {
    activeTab: ProfileTab;
    onTabChange: (tab: ProfileTab) => void;
    watchlistCount?: number;
    favoriteCount?: number;
}

export function ProfileTabs({ activeTab, onTabChange, watchlistCount, favoriteCount }: ProfileTabsProps) {
    const tabs: { key: ProfileTab; label: string; icon: typeof Bookmark; count?: number }[] = [
        { key: 'watchlist', label: 'Watchlist', icon: Bookmark, count: watchlistCount },
        { key: 'favorite', label: 'Favorites', icon: Heart, count: favoriteCount },
        { key: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div
            className='mt-8 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-base p-1'
            role='tablist'
            aria-label='Profile Tabs'>
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;

                return (
                    <Button
                        key={tab.key}
                        size='md'
                        rounded='full'
                        onClick={() => onTabChange(tab.key)}
                        role='tab'
                        aria-selected={isActive}
                        leftIcon={<Icon size={16} />}
                        className={
                            isActive ?
                                'bg-surface-elevated text-foreground hover:bg-surface-elevated px-4 py-2'
                            :   'bg-transparent text-foreground-muted hover:bg-surface-raised hover:text-foreground px-4 py-2'
                        }>
                        <span>{tab.label}</span>
                    </Button>
                );
            })}
        </div>
    );
}
