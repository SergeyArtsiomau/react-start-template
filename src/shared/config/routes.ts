export const ROUTES = {
  ROOT: '/',
  PROFILE: '/profile',
  OPERATIONS: '/operations',
  OPERATIONS_NEW: '/operations/new',
  operationEdit: (operationId: string) => `/operations/${operationId}/edit`,
} as const;
