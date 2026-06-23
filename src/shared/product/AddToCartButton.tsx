import React from 'react';
import './product.css';

export interface AddToCartButtonProps {
  count?: number;
  disabled?: boolean;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function AddToCartButton({
  count = 0,
  disabled = false,
  onAdd,
  onIncrement,
  onDecrement,
}: AddToCartButtonProps) {
  if (!count) {
    return (
      <button type="button" className="add-to-cart add-to-cart--button" disabled={disabled} onClick={onAdd}>
        В корзину
      </button>
    );
  }

  return (
    <div className="add-to-cart add-to-cart--counter">
      <button
        type="button"
        className="add-to-cart__control"
        aria-label="Уменьшить количество"
        disabled={disabled}
        onClick={onDecrement}
      >
        −
      </button>
      <input className="add-to-cart__input" type="text" readOnly value={count} />
      <button
        type="button"
        className="add-to-cart__control"
        aria-label="Увеличить количество"
        disabled={disabled}
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
}
