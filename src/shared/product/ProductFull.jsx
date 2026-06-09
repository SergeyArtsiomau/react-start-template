import React from 'react';
import { AddToCartButton } from './AddToCartButton';
import './product.css';

export function ProductFull({ price, image, categoryName, name, description, count = 0 }) {
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
