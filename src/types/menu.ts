export interface MenuCategory {
    value: string;
    label: string;
    sortBy: string;
}

export interface MenuItem {
    page: string;
    link?: string;
    hasDropdown?: boolean;
    mediaType?: string;
    categories?: MenuCategory[];
}

export interface StreamingMenuItem {
    label: string;
    action: string;
}
