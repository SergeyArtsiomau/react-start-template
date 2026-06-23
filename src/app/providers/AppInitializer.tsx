import React, { useEffect } from 'react';
import { TOKEN_STORAGE_KEY } from 'src/shared/lib/tokenStorage';
import { initializeAuthThunk, syncTokenFromStorageThunk } from 'src/features/auth/model/authThunks';
import { useAppDispatch } from 'src/app/store';

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== TOKEN_STORAGE_KEY) {
        return;
      }

      dispatch(syncTokenFromStorageThunk(event.newValue));
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [dispatch]);

  return <>{children}</>;
}
