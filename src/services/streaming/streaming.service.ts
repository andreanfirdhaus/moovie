import type {
    StreamingSearchResponse,
    StreamingCategoryResponse,
    StreamingDetailResponse,
    StreamingDetailData,
} from '@/types/streaming';

const BASE_URL = import.meta.env.VITE_STREAMING_BASE_URL as string;

export async function searchStreaming(query: string): Promise<StreamingSearchResponse> {
    const url = `${BASE_URL}?action=search&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Streaming search failed: ${res.status}`);
    return res.json();
}

export async function fetchStreamingCategory(action: string, page = 1): Promise<StreamingCategoryResponse> {
    const url = `${BASE_URL}?action=${encodeURIComponent(action)}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Streaming category fetch failed: ${res.status}`);
    return res.json();
}

export async function getStreamingDetail(detailPath: string): Promise<StreamingDetailData> {
    const url = `${BASE_URL}?action=detail&detailPath=${encodeURIComponent(detailPath)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Streaming detail failed: ${res.status}`);
    const json: StreamingDetailResponse = await res.json();
    const { playerUrl, detailPath: dp, seasons } = json.data;
    return { playerUrl, detailPath: dp, seasons };
}
