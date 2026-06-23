import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductShort } from 'src/shared/product/ProductShort';
import { useGetProductsPageQuery } from 'src/shared/api/api';
import { mapServerProductToListItem } from 'src/shared/api/mappers';
import { usePaginatedList } from 'src/shared/lib/usePaginatedList';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { addToCart, decrementCartItem, incrementCartItem, selectCartQuantityByProductId } from 'src/entities/cart';
import { ROUTES } from 'src/shared/config/routes';
import './product-list.css';

type ProductListItemProps = {
  product: ReturnType<typeof mapServerProductToListItem>;
};

function ProductListItem({ product }: ProductListItemProps) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartQuantityByProductId(product.id));

  return (
    <li className="product-list__item">
      <ProductShort
        price={product.price}
        image={product.image}
        name={product.name}
        description={product.description}
        count={count}
        onAdd={() =>
          dispatch(
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          )
        }
        onIncrement={() => dispatch(incrementCartItem(product.id))}
        onDecrement={() => dispatch(decrementCartItem(product.id))}
      />
      <Link to={ROUTES.productEdit(product.id)} className="product-list__edit">
        Редактировать
      </Link>
    </li>
  );
}

export function ProductList() {
  const location = useLocation();
  const { items, isFetching, isError, sentinelRef, reset } = usePaginatedList(useGetProductsPageQuery);
  const products = items.map(mapServerProductToListItem);

  useEffect(() => {
    reset();
  }, [location.pathname, reset]);

  if (isError) {
    return <p className="product-list__empty">Не удалось загрузить товары с сервера.</p>;
  }

  if (products.length === 0 && !isFetching) {
    return <p className="product-list__empty">Товаров пока нет. Добавьте первый товар.</p>;
  }

  return (
    <>
      <ul className="product-list">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
      <div ref={sentinelRef} className="product-list__sentinel" />
      {isFetching && <p className="product-list__loading">Загрузка...</p>}
    </>
  );
}
