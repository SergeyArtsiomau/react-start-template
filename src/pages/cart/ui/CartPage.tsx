import React from 'react';
import { CartList } from 'src/widgets/cart-list';
import './cart-page.css';

export function CartPage() {
  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Корзина</h1>
      <CartList />
    </div>
  );
}
