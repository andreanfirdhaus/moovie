export interface MediaReviews {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
    read_more: boolean;
}

interface AuthorDetails {
    avatar_path: string | null;
    name: string;
    rating: number | null;
    username: string;
}
