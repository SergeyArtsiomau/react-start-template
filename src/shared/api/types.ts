export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type AuthResult = {
  token: string;
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

export type ParsedSignupErrors = {
  general: string[];
  email: string[];
};
