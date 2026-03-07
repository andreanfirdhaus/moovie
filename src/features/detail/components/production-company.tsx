import { Building } from 'lucide-react';
import { TMDB_IMG_300 } from '@/lib/tmdb-image';

interface ProductionCompanyProps {
    company: {
        id: number;
        name: string;
        logo_path: string | null;
        origin_country?: string;
    };
}

export default function ProductionCompany({ company }: ProductionCompanyProps) {
    return (
        <div className='flex items-start gap-3'>
            {company.logo_path ?
                <img
                    src={TMDB_IMG_300 + company.logo_path}
                    alt={company.name}
                    draggable={false}
                    className='size-12 object-contain bg-white rounded p-1 shrink-0'
                />
            :   <div className='size-12 bg-surface-3 rounded flex items-center justify-center shrink-0'>
                    <Building size={20} className='text-zinc-600' />
                </div>
            }
            <div className='min-w-0 flex-1'>
                <p className='text-sm font-medium text-zinc-200 truncate'>{company.name}</p>
                {company.origin_country && <p className='text-xs text-zinc-500'>{company.origin_country}</p>}
            </div>
        </div>
    );
}
