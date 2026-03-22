import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import type { ServerOption } from '../types';
import type { ServerStatus } from '../hooks/useStreamResolver';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDropdown } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

interface ServerSelectorProps {
    servers: ServerOption[];
    activeServerId: string;
    onSelect: (id: string) => void;
    onRetry: (id: string) => void;
}

function StatusIcon({ status, size = 12 }: { status: ServerStatus; size?: number }) {
    if (status === 'loading') return <Loader2 size={size} className='animate-spin text-brand' />;
    if (status === 'error') return <AlertCircle size={size} className='text-red-400' />;
    return null;
}

function ServerSelectorTrigger({ active }: { active: ServerOption }) {
    const { isOpen } = useDropdown();
    return (
        <DropdownTrigger asChild>
            <Button
                className='px-4 py-2'
                rounded='full'
                variant='ghost'
                rightIcon={
                    <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                }>
                <StatusIcon status={active.status} />
                <span>{active?.label ?? 'Select server'}</span>
                {active?.badge && (
                    <span className='px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-brand/30 text-brand uppercase tracking-wide'>
                        {active.badge}
                    </span>
                )}
            </Button>
        </DropdownTrigger>
    );
}

export default function ServerSelector({ servers, activeServerId, onSelect }: ServerSelectorProps) {
    const active = servers.find((s) => s.id === activeServerId) ?? servers[0];

    return (
        <Dropdown className='w-fit'>
            <ServerSelectorTrigger active={active} />

            <DropdownMenu align='right' className='min-w-[160px] overflow-hidden p-0'>
                <div>
                    {servers.map((server) => {
                        const isActive = server.id === activeServerId;
                        return (
                            <DropdownItem
                                key={server.id}
                                className={cn(
                                    'flex items-center gap-2',
                                    isActive ?
                                        'bg-brand/15 text-brand-light hover:bg-brand/20 hover:text-brand-light focus:bg-brand/20 focus:text-brand-light'
                                    :   ''
                                )}
                                onSelect={() => onSelect(server.id)}>
                                <StatusIcon status={server.status} />

                                <span className='flex-1'>{server.label}</span>

                                {server.badge && (
                                    <span className='px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-brand/30 text-brand uppercase tracking-wide'>
                                        {server.badge}
                                    </span>
                                )}

                                {isActive && <span className='w-1.5 h-1.5 rounded-full bg-brand ml-auto shrink-0' />}
                            </DropdownItem>
                        );
                    })}
                </div>
            </DropdownMenu>
        </Dropdown>
    );
}
