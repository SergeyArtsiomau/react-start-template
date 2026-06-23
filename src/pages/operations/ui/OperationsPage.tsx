import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OperationList } from 'src/widgets/operation-list';
import { ROUTES } from 'src/shared/config/routes';
import './operations-page.css';

export function OperationsPage() {
  return (
    <div className="operations-page">
      <div className="operations-page__header">
        <h1 className="operations-page__title">Операции</h1>
        <Link to={ROUTES.OPERATIONS_NEW} className="operations-page__create">
          Добавить операцию
        </Link>
      </div>
      <p className="operations-page__hint">Список подгружается с сервера при прокрутке.</p>
      <OperationList />
      <Outlet />
    </div>
  );
}
