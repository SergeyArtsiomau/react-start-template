import React from 'react';
import { ProductList } from 'src/widgets/product-list';
import './products-page.css';

export function ProductsPage() {
  return (
    <div className="products-page">
      <h1 className="products-page__title">Товары</h1>
      <ProductList />
    </div>
  );
}
