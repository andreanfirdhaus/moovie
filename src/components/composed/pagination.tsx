interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Don't render if there's only one page or no pages
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxPagesToShow = 7;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage <= 3) {
                // Near the beginning
                for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // In the middle
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className='flex items-center justify-center gap-2 mt-12 mb-8'>
            {/* previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors 
                    ${currentPage === 1 ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-300 hover:text-white'}`}
                aria-label='Previous page'>
                Previous
            </button>

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
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`min-w-[40px] h-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors 
                                ${isActive ? 'bg-[#0957e1] text-white' : 'text-zinc-400 hover:text-white'}`}
                            aria-label={`Page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}>
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* next button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors 
                    ${
                        currentPage === totalPages ?
                            'text-zinc-600 cursor-not-allowed'
                        :   'text-zinc-300 hover:text-white'
                    }`}
                aria-label='Next page'>
                Next
            </button>
        </div>
    );
}
