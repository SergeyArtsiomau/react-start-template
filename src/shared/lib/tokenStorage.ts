export const TOKEN_STORAGE_KEY = 'finance_app_token';

export type TokenPayload = {
  email: string;
  role: 'admin' | 'user';
  id: string;
};

export const createToken = (email: string): string => {
  const role = email.toLowerCase().startsWith('admin@') ? 'admin' : 'user';

  return btoa(
    JSON.stringify({
      email,
      role,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    } satisfies TokenPayload)
  );
};

export const parseToken = (token: string): TokenPayload | null => {
  try {
    const payload = JSON.parse(atob(token)) as TokenPayload;

    if (!payload.email || !payload.role) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const readTokenFromStorage = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);

export const writeTokenToStorage = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeTokenFromStorage = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
