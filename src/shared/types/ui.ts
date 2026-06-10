import type { ReactNode } from 'react';

export interface WithChildren {
  children?: ReactNode;
}

export interface OperationBaseProps {
  amount: string;
  categoryName: string;
  name: string;
  description: string;
}

export interface ProductBaseProps {
  price: string;
  image: string;
  name: string;
  description: string;
}
