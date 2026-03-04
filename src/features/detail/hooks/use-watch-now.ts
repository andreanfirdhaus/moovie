import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchStreaming, getStreamingDetail } from '@/services/streaming';
import type { WatchState } from '@/types/streaming';

interface WatchNowOptions {
    title: string;
    year: string;
    type: string;
    id: string;
}

export function useWatchNow({ title, year, type, id }: WatchNowOptions) {
    const navigate = useNavigate();
    const [isLoadingWatch, setIsLoadingWatch] = useState(false);
    const [watchError, setWatchError] = useState<string | null>(null);

    // normalize title
    const normalizeTitle = (str: string) => {
        return str
            .toLowerCase()
            .replace(/season\s?\d+/gi, '')
            .replace(/s\d+(-s?\d+)?/gi, '')
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    };

    // scoring if the data from tmdb are similar or same with external endpoint for streaming
    const calculateScore = (item: any) => {
        if (!title) return 0;

        const normalizedTMDB = normalizeTitle(title);
        const normalizedItem = normalizeTitle(item.title);

        let score = 0;

        // exact normalized match
        if (normalizedItem === normalizedTMDB) {
            score += 50;
        }

        // partial include
        if (normalizedItem.includes(normalizedTMDB)) {
            score += 30;
        }

        // type match
        if (item.type === type) {
            score += 15;
        }

        // exact year match
        if (item.year === year) {
            score += 20;
        }

        // year tolerance ±1
        if (year && Math.abs(item.year - Number(year)) === 1) {
            score += 10;
        }

        return score;
    };

    const handleWatchNow = async () => {
        if (!title) return;

        setIsLoadingWatch(true);

        try {
            // step 1, search by title
            const searchResult = await searchStreaming(title);

            if (!searchResult.success || !searchResult.items.length) {
                setWatchError(`No streaming results found for "${title}".`);
                return;
            }

            // step 2, rank candidates
            const ranked = searchResult.items
                .map((item: any) => ({
                    item,
                    score: calculateScore(item),
                }))
                .sort((a, b) => b.score - a.score);

            const bestMatch = ranked[0];

            if (!bestMatch || bestMatch.score < 40) {
                setWatchError(`Results found, but not relevant enough to "${title}".`);
                return;
            }

            // step 3, get detail
            const detail = await getStreamingDetail(bestMatch.item.detailPath);

            // step 4, navigate
            const state: WatchState = {
                title,
                playerUrl: detail.playerUrl,
                ...(type === 'tv' && detail.seasons?.length > 0 ? { seasons: detail.seasons } : {}),
            };

            navigate(`/${type}/watch/${id}`, { state });
        } catch (err) {
            console.error('[WatchNow] Error:', err);
            setWatchError('An error occurred while retrieving streaming data.');
        } finally {
            setIsLoadingWatch(false);
        }
    };

    return { handleWatchNow, isLoadingWatch, watchError, setWatchError };
}
