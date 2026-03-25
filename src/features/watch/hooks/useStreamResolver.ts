import { useState, useCallback } from 'react';
import { searchStream, getStreamDetail } from '@/services/stream';
import type { WatchState, StreamSearchItem } from '@/types/stream';

interface StreamResolverProps {
    title: string;
    year: string;
    type: string;
    initialResolved?: ResolvedStream;
}

export type ServerStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ResolvedStream {
    playerUrl: string;
    seasons?: WatchState['seasons'];
}

function normalizeTitle(str: string): string {
    return str
        .toLowerCase()
        .replace(/season\s?\d+/gi, '')
        .replace(/s\d+(-s?\d+)?/gi, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
function calculateScore(item: StreamSearchItem, title: string, type: string, year: string): number {
    if (!title) return 0;
    const normalizedTMDB = normalizeTitle(title);
    const normalizedItem = normalizeTitle(item.title);
    let score = 0;
    if (normalizedItem === normalizedTMDB) score += 50;
    if (normalizedItem.includes(normalizedTMDB)) score += 30;
    if (item.type === type) score += 15;
    if (item.year === year) score += 20;
    if (year && Math.abs(Number(item.year) - Number(year)) === 1) score += 10;
    return score;
}

export function useStreamResolver({ title, year, type, initialResolved }: StreamResolverProps) {
    const [status, setStatus] = useState<ServerStatus>(initialResolved ? 'ready' : 'idle');
    const [error, setError] = useState<string | null>(null);
    const [resolved, setResolved] = useState<ResolvedStream | null>(initialResolved ?? null);

    const resolve = useCallback(async () => {
        if (initialResolved) return;
        if (!title || status === 'loading') return;

        setStatus('loading');
        setError(null);
        setResolved(null);

        try {
            const searchResult = await searchStream(title);

            if (!searchResult.success || !searchResult.items.length) {
                setError(`No streaming results found for "${title}".`);
                setStatus('error');
                return;
            }

            const ranked = searchResult.items
                .map((item: StreamSearchItem) => ({
                    item,
                    score: calculateScore(item, title, type, year),
                }))
                .sort((a, b) => b.score - a.score);

            const bestMatch = ranked[0];

            if (!bestMatch || bestMatch.score < 40) {
                setError(`Results found, but not relevant enough to "${title}".`);
                setStatus('error');
                return;
            }

            const detail = await getStreamDetail(bestMatch.item.detailPath);

            setResolved({
                playerUrl: detail.playerUrl,
                ...(type === 'tv' && detail.seasons?.length > 0 ? { seasons: detail.seasons } : {}),
            });
            setStatus('ready');
        } catch (err) {
            console.error('[useStreamResolver] Error:', err);
            setError('An error occurred while retrieving streaming data.');
            setStatus('error');
        }
    }, [title, year, type, initialResolved]);

    const reset = useCallback(() => {
        if (initialResolved) return;
        setStatus('idle');
        setError(null);
        setResolved(null);
    }, [initialResolved]);

    return { resolve, status, error, resolved, reset };
}
