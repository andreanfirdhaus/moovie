import { X } from 'lucide-react';
import { streamingMenu } from '@/config/streaming-menu';

interface StreamingMenuAsideProps {
    activeAction: string;
    onMenuChange: (action: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function StreamingMenuAside({ activeAction, onMenuChange, isOpen, onClose }: StreamingMenuAsideProps) {
    const menuContent = (
        <div className='flex flex-col h-full'>
            {/* header */}
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-sm font-semibold text-gray-100 uppercase tracking-wider'>Browse</h2>
                {/* close button on mobile */}
                <button onClick={onClose} className='lg:hidden p-1 text-zinc-400 hover:text-zinc-200 transition-colors'>
                    <X size={18} />
                </button>
            </div>

            {/* menu items */}
            <nav className='flex flex-col gap-0.5'>
                {streamingMenu.map((item) => {
                    const isActive = activeAction === item.action;
                    return (
                        <button
                            key={item.action}
                            onClick={() => {
                                onMenuChange(item.action);
                                onClose();
                            }}
                            className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                isActive ?
                                    'bg-[#0957e1]/15 text-[#4a8aff]'
                                :   'text-gray-400 hover:bg-[#1A1A1A] hover:text-gray-200'
                            }`}>
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* mobile backdrop */}
            {isOpen && <div className='fixed inset-0 bg-black/80 backdrop-blur-md z-30 lg:hidden' onClick={onClose} />}

            {/* desktop aside */}
            <aside className='hidden lg:block w-56 xl:w-64 flex-shrink-0'>
                <div className='sticky top-28 bg-[#121212] backdrop-blur-sm rounded-xl p-5'>{menuContent}</div>
            </aside>

            {/* mobile aside */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-[#121212] z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out lg:hidden 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {menuContent}
            </aside>
        </>
    );
}
