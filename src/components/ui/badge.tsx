import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

const badgeVariants = {
    default: 'bg-surface-raised text-zinc-300',
    primary: 'bg-primary/15 text-primary-hover',
    rating: 'bg-black/60 text-yellow-400',
    danger: 'bg-red-950 text-red-400',
    success: 'bg-green-950 text-green-400',
    warning: 'bg-yellow-950 text-yellow-400',
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
