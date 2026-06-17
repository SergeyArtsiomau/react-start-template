import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePage } from 'src/pages/profile';
import { OperationModal, OperationsPage } from 'src/pages/operations';
import { ROUTES } from 'src/shared/config/routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.OPERATIONS} replace />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.OPERATIONS} element={<OperationsPage />}>
        <Route path="new" element={<OperationModal />} />
        <Route path=":operationId/edit" element={<OperationModal />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.OPERATIONS} replace />} />
    </Routes>
  );
}
