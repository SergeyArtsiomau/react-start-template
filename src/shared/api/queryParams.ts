import type { Pagination, Sorting } from './types';

type QueryParams = Record<string, string>;

export const buildQueryParams = (filters: {
  pagination?: Pagination;
  sorting?: Sorting;
  [key: string]: unknown;
}): string => {
  const params: QueryParams = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (typeof value === 'object') {
      params[key] = JSON.stringify(value);
      return;
    }

    params[key] = String(value);
  });

  return new URLSearchParams(params).toString();
};
