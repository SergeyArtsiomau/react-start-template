import React from 'react';
import type { ProductBaseProps } from '../types/ui';
import { AddToCartButton } from './AddToCartButton';
import './product.css';

export interface ProductShortProps extends ProductBaseProps {
  count: number;
}

export function ProductShort({ price, image, name, description, count }: ProductShortProps) {
  return (
    <article className="product product--short">
      <img className="product__image" src={image} alt={name} />
      <div className="product__body">
        <div className="product__price">{price}</div>
        <h3 className="product__name">{name}</h3>
        <p className="product__description product__description--short">{description}</p>
        <AddToCartButton count={count} disabled />
      </div>
    </article>
  );
}
