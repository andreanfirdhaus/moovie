import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className='flex items-center justify-center h-dvh absolute inset-0 z-50 bg-black'>
            <Loader2 className='animate-spin text-[#0957e1] mx-auto mb-2' size={48} />
        </div>
    );
}
