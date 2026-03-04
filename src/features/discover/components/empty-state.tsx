import { Film } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message: string;
}

export default function EmptyState({ title = 'No results found', message }: EmptyStateProps) {
    return (
        <div className='flex flex-col items-center justify-center py-20'>
            <div className='text-6xl mb-4 text-zinc-300'>
                <Film size={56} />
            </div>
            <h2 className='text-xl font-semibold text-zinc-300 mb-2'>{title}</h2>
            <p className='text-zinc-500 text-center max-w-md'>{message}</p>
        </div>
    );
}
