export const ROUTES = {
  ROOT: '/',
  PROFILE: '/profile',
  OPERATIONS: '/operations',
  PRODUCTS: '/products',
  CART: '/cart',
  REGISTRATION: '/registration',
  OPERATIONS_NEW: '/operations/new',
  PRODUCTS_NEW: '/products/new',
  operationEdit: (operationId: string) => `/operations/${operationId}/edit`,
  productEdit: (productId: string) => `/products/${productId}/edit`,
} as const;
