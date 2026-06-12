import { useMemo, useRef } from 'react';

type Callback = (...args: unknown[]) => unknown;

/**
 * Стабильная ссылка на колбэк без зависимостей в useEffect/useLayoutEffect.
 */
export function useEvent<T extends Callback>(callback: T): T {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useMemo(() => ((...args) => callbackRef.current(...args)) as T, []);
}
