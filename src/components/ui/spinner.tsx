import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className='flex items-center justify-center h-dvh'>
            <Loader2 className='animate-spin text-brand mx-auto mb-2' size={48} />
        </div>
    );
}
