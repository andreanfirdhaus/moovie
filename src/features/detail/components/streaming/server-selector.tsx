import { AlertCircle, ChevronDown, Loader2, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDropdown } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';
import type { ServerOption, ServerStatus } from '../../types/streaming';

function StatusIcon({ status }: { status: ServerStatus }) {
    if (status === 'loading') return <Loader2 size={12} className='animate-spin text-brand' />;
    if (status === 'error') return <AlertCircle size={12} className='text-red-400' />;
    return null;
}

function Trigger({ active }: { active: ServerOption }) {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                aria-label={`Select streaming server, current server: ${active.label}`}
                className='flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2.5 text-zinc-400 transition-colors duration-200 hover:bg-surface-3 hover:text-zinc-300'
                variant='ghost'
                rightIcon={<ChevronDown size={12} className={isOpen ? 'rotate-180' : ''} />}>
                <Server size={16} />
                <StatusIcon status={active.status} />
                <span className='text-sm font-medium'>{active.label}</span>
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
            <Trigger active={active} />
            <DropdownMenu align='right' className='min-w-[160px] overflow-hidden p-0'>
                {servers.map((server) => (
                    <DropdownItem
                        key={server.id}
                        className={cn(
                            'flex items-center gap-2',
                            server.id === activeServerId && 'bg-brand/15 text-brand-light'
                        )}
                        onSelect={() => onSelect(server.id)}>
                        <StatusIcon status={server.status} />
                        <span className='flex-1'>{server.label}</span>
                        {server.id === activeServerId && <span className='size-1.5 rounded-full bg-brand' />}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
