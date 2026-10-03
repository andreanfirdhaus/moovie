import { AlertCircle, CheckCircle } from 'lucide-react';

interface AccountNoticeProps {
    message: string;
    error: string;
}

export function AccountNotice({ message, error }: AccountNoticeProps) {
    if (!message && !error) return null;

    if (error) {
        return (
            <div className='rounded-md bg-danger-surface border border-danger-border p-3 sm:p-4 flex items-start gap-3'>
                <AlertCircle size={20} className='text-danger-text flex-shrink-0 mt-0.5' />
                <p className='text-sm text-danger-text'>{error}</p>
            </div>
        );
    }

    return (
        <div className='rounded-md bg-success-surface border border-success-border p-3 sm:p-4 flex items-start gap-3'>
            <CheckCircle size={20} className='text-success-text flex-shrink-0 mt-0.5' />
            <p className='text-sm text-success-text'>{message}</p>
        </div>
    );
}
