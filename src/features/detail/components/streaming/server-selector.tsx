import { AlertCircle, Check, ChevronDown, Loader2, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';
import type { ServerOption, ServerStatus } from '../../types/streaming';

function StatusIcon({ status }: { status: ServerStatus }) {
    if (status === 'loading') return <Loader2 size={13} className='animate-spin text-primary' />;
    if (status === 'error') return <AlertCircle size={13} className='text-danger-text' />;
    return null;
}

function ServerTrigger({ active }: { active: ServerOption }) {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                variant='ghost'
                aria-label={`Select streaming server, current server: ${active.label}`}
                className='flex py-3 px-3.5 min-w-[140px] items-center justify-between rounded-lg border border-border-subtle bg-surface-raised text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-surface-hover hover:text-foreground'>
                <div className='flex items-center gap-2 min-w-0'>
                    <Server size={15} className='shrink-0 text-foreground-muted' />
                    <StatusIcon status={active.status} />
                    <span className='truncate tracking-wide'>{active.label}</span>
                </div>

                <ChevronDown
                    size={13}
                    strokeWidth={2.5}
                    className={cn(
                        'text-foreground-muted transition-transform duration-200 ml-2 shrink-0',
                        isOpen && 'rotate-180 text-foreground'
                    )}
                />
            </Button>
        </DropdownTrigger>
    );
}

export default function ServerSelector({
    servers,
    activeServerId,
    onSelect,
}: {
    servers: ServerOption[];
    activeServerId: string;
    onSelect: (id: string) => void;
}) {
    const active = servers.find((server) => server.id === activeServerId) ?? servers[0];

    return (
        <Dropdown className='w-fit'>
            <ServerTrigger active={active} />

            <DropdownMenu align='right' className='w-56 min-w-[200px] max-w-[calc(100vw-2rem)]'>
                {servers.map((server) => {
                    const isSelected = server.id === activeServerId;

                    return (
                        <DropdownItem
                            key={server.id}
                            onSelect={() => onSelect(server.id)}
                            className={cn(
                                'justify-between',
                                isSelected && 'bg-surface-hover text-foreground font-semibold'
                            )}>
                            <div className='flex items-center gap-2 min-w-0 truncate'>
                                <StatusIcon status={server.status} />
                                <span className='truncate text-sm leading-tight'>{server.label}</span>
                            </div>

                            {isSelected && (
                                <Check size={16} strokeWidth={2} className='flex-shrink-0 ml-2 text-foreground' />
                            )}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
