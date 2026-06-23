import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OperationList } from 'src/widgets/operation-list';
import { useAppSelector } from 'src/app/store';
import { selectIsAdmin } from 'src/features/auth/model/authSlice';
import { ROUTES } from 'src/shared/config/routes';
import './operations-page.css';

export function OperationsPage() {
  const isAdmin = useAppSelector(selectIsAdmin);

  return (
    <div className="operations-page">
      <div className="operations-page__header">
        <h1 className="operations-page__title">Операции</h1>
        {isAdmin && (
          <Link to={ROUTES.OPERATIONS_NEW} className="operations-page__create">
            Добавить операцию
          </Link>
        )}
      </div>
      <OperationList />
      <Outlet />
    </div>
  );
}
