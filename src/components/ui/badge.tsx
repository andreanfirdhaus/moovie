import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

const badgeVariants = {
    default: 'bg-surface-raised border border-border-subtle text-foreground-secondary',
    primary: 'bg-primary-muted text-primary-accent',
    rating: 'bg-black/75 text-warning-text',
    danger: 'bg-danger-surface border border-danger-border text-danger-text',
    success: 'bg-success-surface border border-success-border text-success-text',
    warning: 'bg-warning-surface border border-warning-border text-warning-text',
} as const;

type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold',
                badgeVariants[variant],
                className
            )}>
            {children}
        </span>
    );
}

export type { BadgeProps, BadgeVariant };
