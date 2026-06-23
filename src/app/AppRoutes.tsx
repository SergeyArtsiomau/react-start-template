import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from 'src/pages/profile';
import { OperationModal, OperationsPage } from 'src/pages/operations';
import { ProductModal, ProductsPage } from 'src/pages/products';
import { CartPage } from 'src/pages/cart';
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
            <ProtectedRoute>
              <OperationModal />
            </ProtectedRoute>
          }
        />
        <Route
          path=":operationId/edit"
          element={
            <ProtectedRoute>
              <OperationModal />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={ROUTES.PRODUCTS} element={<ProductsPage />}>
        <Route
          path="new"
          element={
            <ProtectedRoute>
              <ProductModal />
            </ProtectedRoute>
          }
        />
        <Route
          path=":productId/edit"
          element={
            <ProtectedRoute>
              <ProductModal />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path={ROUTES.CART} element={<CartPage />} />
      <Route path="*" element={<Navigate to={ROUTES.OPERATIONS} replace />} />
    </Routes>
  );
}
