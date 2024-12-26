import { PaginatedParams } from '@/src/types/pagination-type'

export function calculatePagination(params?: PaginatedParams) {
  const { 
    pageIndex = 1, 
    limit = 10, 
    orderBy = 'created_at', 
    sortDir = 'desc', 
    search = '' 
  } = params || {};
  
  const from = (pageIndex - 1) * limit;
  const to = from + limit - 1;

  return {
    from,
    to,
    limit,
    pageIndex,
    orderBy,
    sortDir,
    search
  };
}

export function calculateNumberOfPages(totalCount: number, limit: number) {
  return Math.ceil(totalCount / limit);
}