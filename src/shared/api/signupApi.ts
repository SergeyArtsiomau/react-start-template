import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, COMMAND_ID } from './config';
import { parseServerErrors } from './parseServerErrors';
import type { AuthResult, SignUpBody } from './types';

export const signupApi = createApi({
  reducerPath: 'signupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
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
      transformErrorResponse: (response) => parseServerErrors(response.data),
    }),
  }),
});

export const { useSignupMutation } = signupApi;
