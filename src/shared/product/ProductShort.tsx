import React from 'react';
import { CroppedText } from '../cropped-text/CroppedText';
import type { ProductBaseProps } from '../types/ui';
import { AddToCartButton } from './AddToCartButton';
import './product.css';

export interface ProductShortProps extends ProductBaseProps {
  count?: number;
  disabled?: boolean;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function ProductShort({
  price,
  image,
  name,
  description,
  count = 0,
  disabled = false,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductShortProps) {
  const isDisabled = disabled || !onAdd;

  return (
    <article className="product product--short">
      <img className="product__image" src={image} alt={name} />
      <div className="product__body">
        <div className="product__price">{price}</div>
        <h3 className="product__name">{name}</h3>
        <CroppedText className="product__description product__description--short" opened={false} rows={2}>
          {description}
        </CroppedText>
        <AddToCartButton
          count={count}
          disabled={isDisabled}
          onAdd={onAdd}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </div>
    </article>
  );
}
