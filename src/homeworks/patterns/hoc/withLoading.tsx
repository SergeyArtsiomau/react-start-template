import React, { type ComponentType } from 'react';
import './hoc.css';

export interface WithLoadingProps {
  isLoading: boolean;
}

export function withLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  function WithLoadingComponent({ isLoading, ...props }: P & WithLoadingProps) {
    if (isLoading) {
      return <div className="balance-loading">Загрузка данных...</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  }

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithLoadingComponent;
}
