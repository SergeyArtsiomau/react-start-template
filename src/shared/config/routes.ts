export const ROUTES = {
  ROOT: '/',
  PROFILE: '/profile',
  OPERATIONS: '/operations',
  PRODUCTS: '/products',
  CART: '/cart',
  REGISTRATION: '/registration',
  OPERATIONS_NEW: '/operations/new',
  operationEdit: (operationId: string) => `/operations/${operationId}/edit`,
} as const;
