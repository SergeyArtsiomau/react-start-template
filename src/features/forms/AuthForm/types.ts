import type { FormProps } from 'src/features/forms/types';

export type AuthFormValues = {
  email: string;
  password: string;
};

export type AuthFormErrors = Partial<Record<keyof AuthFormValues, string>>;

export type AuthFormProps = FormProps<AuthFormValues>;
