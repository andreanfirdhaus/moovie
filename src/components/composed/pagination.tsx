import { Button } from '../ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages: (number | string)[] = [];
        const maxPagesToShow = 7;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // first page
            pages.push(1);

            if (currentPage <= 3) {
                // beginning
                for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
            } else if (currentPage >= totalPages - 2) {
                // end
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // middle
                for (let i = currentPage - 1; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
                pages.push('...');
            }
        }

        return pages;
    };

    const pageNumbers = getPages();

    return (
        <div className='flex items-center justify-center gap-2 mt-12 mb-8'>
            {/* previous */}
            <Button
                variant='link'
                rounded='md'
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label='Previous page'
                className='hidden sm:block disabled:opacity-30'>
                Previous
            </Button>

            {/* page number */}
            <div className='flex items-center gap-1 sm:gap-2'>
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className='px-2 py-2 text-zinc-500'>
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <Button
                            key={pageNum}
                            variant='link'
                            size='sm'
                            rounded='md'
                            onClick={() => onPageChange(pageNum)}
                            aria-label={`Page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                            className={`min-w-[40px] h-[40px] ${isActive ? 'bg-brand text-white hover:text-white' : ''}`}>
                            {pageNum}
                        </Button>
                    );
                })}
            </div>

            {/* next */}
            <Button
                variant='link'
                rounded='md'
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label='Next page'
                className='hidden sm:block disabled:opacity-30'>
                Next
            </Button>
        </div>
    );
}
