import React from 'react';
import './product.css';

export function AddToCartButton({ count = 0 }) {
  if (count <= 0) {
    return (
      <button type="button" className="add-to-cart add-to-cart--button">
        В корзину
      </button>
    );
  }

  return (
    <div className="add-to-cart add-to-cart--counter">
      <button type="button" className="add-to-cart__control" aria-label="Уменьшить количество">
        −
      </button>
      <input className="add-to-cart__input" type="text" readOnly value={count} />
      <button type="button" className="add-to-cart__control" aria-label="Увеличить количество">
        +
      </button>
    </div>
  );
}
