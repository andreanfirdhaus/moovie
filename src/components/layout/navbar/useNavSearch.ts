import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/components/layout/navbar/useDebounce';
import { useSearchMulti } from '@/features/search/hooks/useSearch.query';
import { getDetailUrl } from '@/utils/url';

export function useNavSearch(enabled = true) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    const { data, isLoading } = useSearchMulti(debouncedQuery, 1, enabled);
    const results = (data?.results || []).filter((item: any) => item.media_type !== 'person');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?query=${encodeURIComponent(query)}`);
        reset();
    };

    const handleResultClick = (result: any) => {
        navigate(getDetailUrl(result));
        reset();
    };

    const reset = () => {
        setQuery('');
        setIsOpen(false);
    };

    return { query, setQuery, isOpen, setIsOpen, results, isLoading, handleSubmit, handleResultClick, reset };
}
