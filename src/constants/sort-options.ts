export const SORT_BY = {
    POPULARITY_DESC: 'popularity.desc',
    POPULARITY_ASC: 'popularity.asc',
    DATE_DESC: 'primary_release_date.desc',
    DATE_ASC: 'primary_release_date.asc',
    RATING_DESC: 'vote_average.desc',
    RATING_ASC: 'vote_average.asc',
} as const;

export type SortValue = (typeof SORT_BY)[keyof typeof SORT_BY] | string;

export interface SortOption {
    value: SortValue;
    label: string;
}

export const sortOptions: SortOption[] = [
    { value: SORT_BY.POPULARITY_DESC, label: 'Highest Popularity' },
    { value: SORT_BY.POPULARITY_ASC, label: 'Lowest Popularity' },
    { value: SORT_BY.DATE_DESC, label: 'Most Recent' },
    { value: SORT_BY.DATE_ASC, label: 'Least Recent' },
    { value: SORT_BY.RATING_DESC, label: 'Highest Rating' },
    { value: SORT_BY.RATING_ASC, label: 'Lowest Rating' },
];
