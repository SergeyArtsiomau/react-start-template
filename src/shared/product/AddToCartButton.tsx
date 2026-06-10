import React from 'react';
import './product.css';

export interface AddToCartButtonProps {
  count?: number;
  disabled?: boolean;
}

export function AddToCartButton({ count = 0, disabled = false }: AddToCartButtonProps) {
  if (count <= 0) {
    return (
      <button type="button" className="add-to-cart add-to-cart--button" disabled={disabled}>
        В корзину
      </button>
    );
  }

  return (
    <div className="add-to-cart add-to-cart--counter">
      <button type="button" className="add-to-cart__control" aria-label="Уменьшить количество" disabled={disabled}>
        −
      </button>
      <input className="add-to-cart__input" type="text" readOnly value={count} />
      <button type="button" className="add-to-cart__control" aria-label="Увеличить количество" disabled={disabled}>
        +
      </button>
    </div>
  );
}
