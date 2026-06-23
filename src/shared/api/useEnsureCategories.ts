import { useEffect, useRef } from 'react';
import { useCreateCategoryMutation, useGetCategoriesQuery } from 'src/shared/api/api';

const DEFAULT_CATEGORIES = ['Продукты', 'Доход', 'Транспорт'];

export function useEnsureCategories() {
  const initializedRef = useRef(false);
  const { data, isSuccess } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  useEffect(() => {
    if (!isSuccess || initializedRef.current) {
      return;
    }

    if ((data?.data.length ?? 0) > 0) {
      initializedRef.current = true;
      return;
    }

    initializedRef.current = true;

    DEFAULT_CATEGORIES.forEach((name) => {
      createCategory({ name });
    });
  }, [createCategory, data?.data.length, isSuccess]);

  return data?.data ?? [];
}
