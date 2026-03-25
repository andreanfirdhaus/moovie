export interface NavMenuCategory {
    value: string;
    label: string;
    sortBy: string;
}

export interface NavMenuItem {
    page: string;
    link?: string;
    hasDropdown?: boolean;
    mediaType?: string;
    categories?: NavMenuCategory[];
}

export interface StreamCategoryItem {
    label: string;
    action: string;
}
