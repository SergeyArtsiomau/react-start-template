import { API_BASE_URL, COMMAND_ID } from './config';
import { parseServerErrors } from './parseServerErrors';
import type { AuthResult, ParsedSignupErrors, SignUpBody } from './types';

export class SignupRequestError extends Error {
  parsedErrors: ParsedSignupErrors;

  constructor(parsedErrors: ParsedSignupErrors) {
    super(parsedErrors.general[0] ?? parsedErrors.email[0] ?? 'Signup failed');
    this.parsedErrors = parsedErrors;
  }
}

export const signupRequest = async (email: string, password: string): Promise<AuthResult> => {
  const body: SignUpBody = {
    email,
    password,
    commandId: COMMAND_ID,
  };

  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new SignupRequestError(parseServerErrors(data));
  }

  return data as AuthResult;
};
