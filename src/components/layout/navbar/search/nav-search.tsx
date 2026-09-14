import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { useNavSearch } from './useSearch';
import { SearchDropdown } from './search-dropdown';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

interface NavSearchProps {
    className?: string;
}

export function NavSearch({ className }: NavSearchProps) {
    const {
        isOpen,
        setIsOpen,
        query,
        setQuery,
        results,
        isLoading,
        containerRef,
        inputRef,
        debouncedQuery,
        handleClear,
        handleClose,
    } = useNavSearch();

    return (
        <div ref={containerRef} className={cn('relative flex items-center justify-end', className)}>
            <motion.div
                initial={false}
                animate={{
                    width: isOpen ? 320 : 44,
                    borderColor: isOpen ? '#2b2b2b' : '',
                    backgroundColor: isOpen ? '#141414' : '',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                }}
                className={cn(
                    'h-11 flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-transparent transition-colors',
                    isOpen ? 'px-0 pr-2' : 'cursor-pointer hover:border-white/40 hover:bg-white/5'
                )}
                onClick={() => {
                    if (!isOpen) setIsOpen(true);
                }}>
                {/* search icon trigger */}
                <Button
                    type='button'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                    variant='ghost'
                    leftIcon={<Search size={18} strokeWidth={2} />}
                    className='flex size-8 items-center justify-center flex-shrink-0 rounded-full bg-transparent text-foreground hover:bg-white/5 transition-colors '
                    aria-label='Search'
                />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12 }}
                            transition={{ duration: 0.15 }}
                            className='flex flex-1 items-center min-w-0 ml-1.5'>
                            <input
                                ref={inputRef}
                                type='text'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search...'
                                className='w-full bg-transparent text-sm text-foreground placeholder:text-foreground-muted focus:outline-none'
                            />

                            {/* loader or clear button */}
                            <div className='flex items-center gap-1 flex-shrink-0 ml-1'>
                                {isLoading ?
                                    <span className='flex size-6 items-center justify-center rounded-full text-foreground-muted'>
                                        <Loader2 size={14} className='animate-spin text-foreground-muted' />
                                    </span>
                                : query ?
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClear();
                                        }}
                                        className='flex size-6 items-center justify-center rounded-full text-foreground-muted hover:text-foreground hover:bg-white/10 transition-colors'
                                        aria-label='Clear query'>
                                        <X size={14} />
                                    </button>
                                :   null}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* search results */}
            <AnimatePresence>
                {isOpen && debouncedQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className='absolute right-0 top-full mt-2 w-80 sm:w-96 z-50 origin-top-right'>
                        <SearchDropdown
                            results={results}
                            isLoading={isLoading}
                            query={debouncedQuery}
                            onClose={handleClose}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
