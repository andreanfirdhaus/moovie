import { apiClient } from '@/config/api-client';

export const getPersonDetail = (personId: number) => apiClient.get(`/person/${personId}`);

export const getPersonKnownFor = (personId: number) => apiClient.get(`/person/${personId}/combined_credits`);
