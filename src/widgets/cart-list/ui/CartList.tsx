import React, { useState } from 'react';
import { CartItem } from 'src/shared/product/CartItem';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { clearCart, removeFromCart, selectCartItems } from 'src/entities/cart';
import { useCreateOrderMutation } from 'src/shared/api/api';
import { getFirstServerError } from 'src/shared/api/parseServerErrors';
import type { ParsedServerErrors } from 'src/shared/api/types';
import './cart-list.css';

export function CartList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (items.length === 0) {
    return <p className="cart-list__empty">Корзина пуста. Добавьте товары на странице «Товары».</p>;
  }

  const handleCreateOrder = async () => {
    setOrderError(null);
    setOrderSuccess(null);

    try {
      const order = await createOrder({
        products: items.map((item) => ({
          id: item.productId,
          quantity: item.quantity,
        })),
      }).unwrap();

      dispatch(clearCart());
      setOrderSuccess(`Заказ #${order.id.slice(-6)} создан`);
    } catch (error) {
      const parsed = (error as { data?: ParsedServerErrors })?.data;
      setOrderError(getFirstServerError(parsed ?? { general: ['Ошибка создания заказа'], email: [], password: [] }));
    }
  };

  return (
    <div className="cart-list__wrapper">
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

      {orderError && <p className="cart-list__error">{orderError}</p>}
      {orderSuccess && <p className="cart-list__success">{orderSuccess}</p>}

      <button type="button" className="cart-list__checkout" disabled={isLoading} onClick={handleCreateOrder}>
        {isLoading ? 'Оформление...' : 'Оформить заказ'}
      </button>
    </div>
  );
}
