import { ReactNode } from 'react';

interface SettingsCardProps {
    title: string;
    description?: string;
    children: ReactNode;
    variant?: 'default' | 'danger';
}

export function SettingsCard({ title, description, children, variant = 'default' }: SettingsCardProps) {
    const isDefault = variant === 'default';

    return (
        <div
            className={`rounded-lg border p-5 ${isDefault ? 'bg-surface-raised border-border-subtle' : 'bg-danger-surface border-danger-border'}`}>
            <h3 className={`font-semibold ${isDefault ? 'text-foreground' : 'text-danger-text'}`}>{title}</h3>

            {description && (
                <p className={`mt-1 text-sm ${isDefault ? 'text-foreground-muted' : 'text-danger-text/80'}`}>
                    {description}
                </p>
            )}

            <div className='mt-4'>{children}</div>
        </div>
    );
}
