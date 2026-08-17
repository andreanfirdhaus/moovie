import { TMDB_IMG_300 } from '@/config/images';

interface ProductionCompanyProps {
    company: {
        id: number;
        name: string;
        logo_path: string | null;
        origin_country?: string;
    };
}

export default function ProductionCompany({ company }: ProductionCompanyProps) {
    if (!company.logo_path) return null;

    return (
        <img
            src={TMDB_IMG_300 + company.logo_path}
            alt={company.name}
            draggable={false}
            loading='lazy'
            className='h-8 md:h-10 w-auto max-w-[100px] sm:max-w-[120px] object-contain flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity grayscale invert'
        />
    );
}
