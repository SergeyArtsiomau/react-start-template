import React from 'react';
import { ProductShort } from 'src/shared/product/ProductShort';
import { MOCK_PRODUCTS } from 'src/entities/product';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { addToCart, decrementCartItem, incrementCartItem, selectCartQuantityByProductId } from 'src/entities/cart';
import './product-list.css';

export function ProductList() {
  const dispatch = useAppDispatch();

  return (
    <ul className="product-list">
      {MOCK_PRODUCTS.map((product) => (
        <ProductListItem key={product.id} product={product} dispatch={dispatch} />
      ))}
    </ul>
  );
}

type ProductListItemProps = {
  product: (typeof MOCK_PRODUCTS)[number];
  dispatch: ReturnType<typeof useAppDispatch>;
};

function ProductListItem({ product, dispatch }: ProductListItemProps) {
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
    </li>
  );
}
