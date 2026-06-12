import React, { type ReactNode } from 'react';
import { OperationFilterProvider } from './OperationFilterContext';
import { OperationFilterControls } from './OperationFilterControls';
import { OperationFilterList } from './OperationFilterList';
import './filter.css';

interface OperationFilterProps {
  children: ReactNode;
}

function OperationFilterRoot({ children }: OperationFilterProps) {
  return (
    <OperationFilterProvider>
      <div className="operation-filter">{children}</div>
    </OperationFilterProvider>
  );
}

export const OperationFilter = Object.assign(OperationFilterRoot, {
  Controls: OperationFilterControls,
  List: OperationFilterList,
});
