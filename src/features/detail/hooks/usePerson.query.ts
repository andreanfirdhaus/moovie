import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getPersonDetail, getPersonKnownFor } from '@/services/tmdb/person.service';

export const usePersonDetail = (personId?: number) =>
    useQuery({
        queryKey: queryKeys.person.detail(personId ?? 0),
        queryFn: async () => {
            const res = await getPersonDetail(personId!);
            return res.data;
        },
        enabled: !!personId,
        staleTime: 1000 * 60 * 30,
    });

export const usePersonKnownFor = (personId?: number) =>
    useQuery({
        queryKey: queryKeys.person.knownFor(personId ?? 0),
        queryFn: async () => {
            const res = await getPersonKnownFor(personId!);
            const cast = res.data.cast || [];
            const seen = new Set();
            return cast
                .filter((item: any) => {
                    if (seen.has(item.id)) return false;
                    seen.add(item.id);
                    return !!item.poster_path;
                })
                .sort((a: any, b: any) => b.popularity - a.popularity)
                .slice(0, 10);
        },
        enabled: !!personId,
        staleTime: 1000 * 60 * 30,
    });
