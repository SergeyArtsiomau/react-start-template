export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
};

export type ServerProfile = {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  commandId: string;
};

export type UpdateProfileBody = {
  name: string;
};

export type ServerCategory = {
  id: string;
  name: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
  commandId: string;
};

export type ServerOperation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  date: string;
  category: ServerCategory;
  commandId: string;
  type: 'Cost' | 'Profit';
};

export type ServerProduct = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: string;
  updatedAt: string;
  oldPrice?: number;
  price: number;
  commandId: string;
  category: ServerCategory;
};

export type OrderStatus =
  | 'pending_confirmation'
  | 'processing'
  | 'packaging'
  | 'waiting_for_delivery'
  | 'in_transit'
  | 'delivered'
  | 'return_requested'
  | 'order_cancelled';

export type ServerOrder = {
  id: string;
  products: Array<{
    _id: string;
    product: ServerProduct;
    quantity: number;
  }>;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  commandId: string;
};

export type Pagination = {
  pageSize?: number;
  pageNumber?: number;
};

export type Sorting = {
  type: 'ASC' | 'DESC';
  field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: Sorting;
};

export type ServerErrorItem = {
  name: string;
  message: string;
  fieldName?: string;
  extensions?: {
    code: string;
  };
  stack?: string;
};

export type ServerErrors = {
  errors: ServerErrorItem[];
};

export type ParsedServerErrors = {
  general: string[];
  email: string[];
  password: string[];
};

export type ParsedSignupErrors = ParsedServerErrors;

export type CreateOperationBody = {
  name: string;
  desc?: string;
  amount: number;
  date: string;
  type: 'Profit' | 'Cost';
  categoryId: string;
};

export type UpdateOperationBody = CreateOperationBody;

export type CreateProductBody = {
  name: string;
  photo?: string;
  desc?: string;
  oldPrice?: number;
  price: number;
  categoryId: string;
};

export type UpdateProductBody = CreateProductBody;

export type CreateOrderBody = {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  status?: OrderStatus;
};
