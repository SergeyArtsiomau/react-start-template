import React from 'react';
import './product.css';

export function CartItem({ name, price, image, quantity = 1 }) {
  return (
    <article className="cart-item">
      <img className="cart-item__image" src={image} alt={name} />
      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
        <p className="cart-item__meta">
          {price} × {quantity}
        </p>
      </div>
      <button type="button" className="cart-item__remove" aria-label="Удалить товар">
        Удалить
      </button>
    </article>
  );
}
