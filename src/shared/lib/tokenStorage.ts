export const TOKEN_STORAGE_KEY = 'finance_app_token';

export const readTokenFromStorage = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);

export const writeTokenToStorage = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeTokenFromStorage = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
