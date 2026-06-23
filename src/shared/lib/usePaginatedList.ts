import { useCallback, useEffect, useState } from 'react';
import type { PaginatedResponse } from 'src/shared/api/types';
import { useInfiniteScroll } from 'src/shared/lib/useInfiniteScroll';

type PageQueryHook<T> = (
  pageNumber: number,
  options?: { skip?: boolean }
) => {
  data?: PaginatedResponse<T>;
  isFetching: boolean;
  isError: boolean;
};

export function usePaginatedList<T>(usePageQuery: PageQueryHook<T>) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const { data, isFetching, isError } = usePageQuery(page);

  useEffect(() => {
    if (!data) {
      return;
    }

    setTotal(data.pagination.total);
    setItems((current) => (page === 1 ? data.data : [...current, ...data.data]));
  }, [data, page]);

  const hasMore = items.length < total;

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((current) => current + 1);
    }
  }, [hasMore, isFetching]);

  const reset = useCallback(() => {
    setPage(1);
    setItems([]);
    setTotal(0);
  }, []);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, isFetching);

  return {
    items,
    isFetching,
    isError,
    hasMore,
    sentinelRef,
    reset,
  };
}
