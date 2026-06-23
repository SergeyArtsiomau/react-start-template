import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ProductList } from 'src/widgets/product-list';
import { ROUTES } from 'src/shared/config/routes';
import './products-page.css';

export function ProductsPage() {
  return (
    <div className="products-page">
      <div className="products-page__header">
        <h1 className="products-page__title">Товары</h1>
        <Link to={ROUTES.PRODUCTS_NEW} className="products-page__create">
          Добавить товар
        </Link>
      </div>
      <p className="products-page__hint">Список подгружается с сервера при прокрутке.</p>
      <ProductList />
      <Outlet />
    </div>
  );
}
