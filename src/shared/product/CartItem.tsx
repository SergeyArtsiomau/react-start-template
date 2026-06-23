import React from 'react';
import './product.css';

export interface CartItemProps {
  name: string;
  price: string;
  image: string;
  quantity?: number;
  onRemove?: () => void;
}

export function CartItem({ name, price, image, quantity = 1, onRemove }: CartItemProps) {
  return (
    <article className="cart-item">
      <img className="cart-item__image" src={image} alt={name} />
      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
        <p className="cart-item__meta">
          {price} × {quantity}
        </p>
      </div>
      <button
        type="button"
        className="cart-item__remove"
        aria-label="Удалить товар"
        disabled={!onRemove}
        onClick={onRemove}
      >
        Удалить
      </button>
    </article>
  );
}
