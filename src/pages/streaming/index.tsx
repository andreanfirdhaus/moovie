import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'lucide-react';
import StreamingCard from '@/components/ui/streaming-card';
import StreamingMenuAside from '@/components/composed/streaming-menu-aside';
import Pagination from '@/components/composed/pagination';
import { useStreamingCategory } from '@/features/streaming/queries/use-streaming';
import { getStreamingDetail } from '@/services/streaming';
import { streamingMenu } from '@/config/streaming-menu';
import type { StreamingSearchItem } from '@/types/streaming';

export default function Streaming() {
    const navigate = useNavigate();
    const [activeAction, setActiveAction] = useState('trending');
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loadingDetailPath, setLoadingDetailPath] = useState<string | null>(null);

    const { data, isLoading } = useStreamingCategory(activeAction, currentPage);
    const items = data?.items || [];
    const hasMore = data?.hasMore ?? false;
    const totalPages = hasMore ? currentPage + 1 : currentPage;

    const activeLabel = streamingMenu.find((m) => m.action === activeAction)?.label || 'Streaming';

    function handleMenuChange(action: string) {
        setActiveAction(action);
        setCurrentPage(1);
    }

    async function handleCardClick(item: StreamingSearchItem) {
        try {
            setLoadingDetailPath(item.detailPath);
            const detail = await getStreamingDetail(item.detailPath);
            navigate(`/streaming/watch/${item.detailPath}`, {
                state: {
                    title: item.title,
                    playerUrl: detail.playerUrl,
                    seasons: detail.seasons,
                },
            });
        } catch (err) {
            console.error('Failed to fetch streaming detail:', err);
        } finally {
            setLoadingDetailPath(null);
        }
    }

    return (
        <main className='min-h-screen pt-20 md:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-9xl mx-auto lg:mx-5 xl:mx-16'>
                {/* header */}
                <header className='mb-4 flex items-center justify-between'>
                    <h1 className='text-xl font-semibold text-zinc-100'>{activeLabel}</h1>

                    {/* mobile menu toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className='lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-full text-sm font-medium transition-colors'>
                        <List size={16} />
                        <span>Browse</span>
                    </button>
                </header>

                {/* two column layout */}
                <div className='flex gap-6 xl:gap-8 items-start'>
                    <StreamingMenuAside
                        activeAction={activeAction}
                        onMenuChange={handleMenuChange}
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />

                    {/* content */}
                    <section className='flex-1 min-w-0'>
                        {isLoading ?
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className='mx-0.5 animate-pulse'>
                                        <div className='relative w-full aspect-[2/3] overflow-hidden rounded-[4px] sm:rounded-[8px] bg-surface-2' />
                                        <div className='mt-1.5 sm:mt-2.5 space-y-1.5'>
                                            <div className='h-3.5 bg-surface-4 rounded w-4/5' />
                                            <div className='h-3 bg-surface-3 rounded w-1/3' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        : items.length > 0 ?
                            <>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-8'>
                                    {items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleCardClick(item)}
                                            disabled={loadingDetailPath === item.detailPath}
                                            className={`text-left transition-opacity ${
                                                loadingDetailPath === item.detailPath ?
                                                    'opacity-50 pointer-events-none'
                                                :   ''
                                            }`}>
                                            <StreamingCard item={item} />
                                        </button>
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        :   <div className='flex items-center justify-center py-20'>
                                <p className='text-zinc-400 text-sm'>No content available.</p>
                            </div>
                        }
                    </section>
                </div>
            </div>
        </main>
    );
}
