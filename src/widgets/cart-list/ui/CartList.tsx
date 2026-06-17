import React from 'react';
import { CartItem } from 'src/shared/product/CartItem';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { removeFromCart, selectCartItems } from 'src/entities/cart';
import './cart-list.css';

export function CartList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);

  if (items.length === 0) {
    return <p className="cart-list__empty">Корзина пуста. Добавьте товары на странице «Товары».</p>;
  }

  return (
    <ul className="cart-list">
      {items.map((item) => (
        <li key={item.id} className="cart-list__item">
          <CartItem
            name={item.name}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        </li>
      ))}
    </ul>
  );
}
