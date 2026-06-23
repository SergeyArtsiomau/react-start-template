import { createApi } from '@reduxjs/toolkit/query/react';
import { COMMAND_ID } from './config';
import { baseQuery } from './baseQuery';
import { buildQueryParams } from './queryParams';
import { parseServerErrors } from './parseServerErrors';
import type {
  AuthResult,
  CreateOperationBody,
  CreateOrderBody,
  CreateProductBody,
  PaginatedResponse,
  ServerCategory,
  ServerOperation,
  ServerOrder,
  ServerProduct,
  ServerProfile,
  SignInBody,
  SignUpBody,
  UpdateOperationBody,
  UpdateProductBody,
  UpdateProfileBody,
} from './types';

const DEFAULT_PAGE_SIZE = 10;

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Profile', 'Operations', 'Products', 'Categories', 'Orders'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResult, Pick<SignUpBody, 'email' | 'password'>>({
      query: ({ email, password }) => ({
        url: '/signup',
        method: 'POST',
        body: {
          email,
          password,
          commandId: COMMAND_ID,
        } satisfies SignUpBody,
      }),
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка регистрации'),
    }),
    signin: builder.mutation<AuthResult, SignInBody>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка авторизации'),
    }),
    getProfile: builder.query<ServerProfile, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка загрузки профиля'),
    }),
    updateProfile: builder.mutation<ServerProfile, UpdateProfileBody>({
      query: (body) => ({
        url: '/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка сохранения профиля'),
    }),
    getCategories: builder.query<PaginatedResponse<ServerCategory>, void>({
      query: () => `/categories?${buildQueryParams({ pagination: { pageSize: 100, pageNumber: 1 } })}`,
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<ServerCategory, { name: string }>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    getOperationsPage: builder.query<PaginatedResponse<ServerOperation>, number>({
      query: (pageNumber) =>
        `/operations?${buildQueryParams({
          pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber },
          sorting: { type: 'DESC', field: 'createdAt' },
        })}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((operation) => ({ type: 'Operations' as const, id: operation.id })),
              { type: 'Operations', id: 'LIST' },
            ]
          : [{ type: 'Operations', id: 'LIST' }],
    }),
    getOperationById: builder.query<ServerOperation, string>({
      query: (id) => `/operations/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Operations', id }],
    }),
    createOperation: builder.mutation<ServerOperation, CreateOperationBody>({
      query: (body) => ({
        url: '/operations',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Operations', id: 'LIST' }],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка создания операции'),
    }),
    updateOperation: builder.mutation<ServerOperation, { id: string; body: UpdateOperationBody }>({
      query: ({ id, body }) => ({
        url: `/operations/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Operations', id },
        { type: 'Operations', id: 'LIST' },
      ],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка обновления операции'),
    }),
    getProductsPage: builder.query<PaginatedResponse<ServerProduct>, number>({
      query: (pageNumber) =>
        `/products?${buildQueryParams({
          pagination: { pageSize: DEFAULT_PAGE_SIZE, pageNumber },
          sorting: { type: 'DESC', field: 'createdAt' },
        })}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((product) => ({ type: 'Products' as const, id: product.id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<ServerProduct, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<ServerProduct, CreateProductBody>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка создания товара'),
    }),
    updateProduct: builder.mutation<ServerProduct, { id: string; body: UpdateProductBody }>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка обновления товара'),
    }),
    createOrder: builder.mutation<ServerOrder, CreateOrderBody>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
      transformErrorResponse: (response) => parseServerErrors(response.data, 'Ошибка создания заказа'),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetOperationsPageQuery,
  useLazyGetOperationsPageQuery,
  useGetOperationByIdQuery,
  useCreateOperationMutation,
  useUpdateOperationMutation,
  useGetProductsPageQuery,
  useLazyGetProductsPageQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateOrderMutation,
} = api;
