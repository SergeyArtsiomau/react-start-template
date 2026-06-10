import React from 'react';
import type { ProductBaseProps } from '../types/ui';
import { AddToCartButton } from './AddToCartButton';
import './product.css';

export interface ProductFullProps extends ProductBaseProps {
  categoryName: string;
  count?: number;
}

export function ProductFull({ price, image, categoryName, name, description, count = 0 }: ProductFullProps) {
  return (
    <article className="product product--full">
      <img className="product__image product__image--large" src={image} alt={name} />
      <div className="product__body">
        <span className="product__category">{categoryName}</span>
        <h2 className="product__name product__name--large">{name}</h2>
        <div className="product__price product__price--large">{price}</div>
        <p className="product__description">{description}</p>
        <AddToCartButton count={count} disabled />
      </div>
    </article>
  );
}
