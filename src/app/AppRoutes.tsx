import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from 'src/pages/profile';
import { OperationModal, OperationsPage } from 'src/pages/operations';
import { ProductsPage } from 'src/pages/products';
import { CartPage } from 'src/pages/cart';
import { AdminRoute } from './providers/AdminRoute';
import { ProtectedRoute } from './providers/ProtectedRoute';
import { ROUTES } from 'src/shared/config/routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.OPERATIONS} replace />} />
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.OPERATIONS} element={<OperationsPage />}>
        <Route
          path="new"
          element={
            <AdminRoute>
              <OperationModal />
            </AdminRoute>
          }
        />
        <Route
          path=":operationId/edit"
          element={
            <AdminRoute>
              <OperationModal />
            </AdminRoute>
          }
        />
      </Route>
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path="*" element={<Navigate to={ROUTES.OPERATIONS} replace />} />
    </Routes>
  );
}
