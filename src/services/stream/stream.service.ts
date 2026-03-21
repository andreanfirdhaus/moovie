import type {
    StreamSearchResponse,
    StreamCategoryResponse,
    StreamDetailResponse,
    StreamDetailData,
} from '@/types/stream';

const BASE_URL = import.meta.env.VITE_STREAMING_BASE_URL;

export async function searchStream(query: string): Promise<StreamSearchResponse> {
    const url = `${BASE_URL}?action=search&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Streaming search failed: ${res.status}`);
    return res.json();
}

export async function fetchStreamCategory(action: string, page = 1): Promise<StreamCategoryResponse> {
    const url = `${BASE_URL}?action=${encodeURIComponent(action)}&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Streaming category fetch failed: ${res.status}`);
    return res.json();
}

export async function getStreamDetail(detailPath: string): Promise<StreamDetailData> {
    const url = `${BASE_URL}?action=detail&detailPath=${encodeURIComponent(detailPath)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Streaming detail failed: ${res.status}`);
    const json: StreamDetailResponse = await res.json();
    const { playerUrl, detailPath: dp, seasons } = json.data;
    return { playerUrl, detailPath: dp, seasons };
}
