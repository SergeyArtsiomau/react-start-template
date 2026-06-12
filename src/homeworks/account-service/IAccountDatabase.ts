import type { ProductType, UserType } from './types';

export interface IAccountDatabase {
  getGeneralDiscount(userType: UserType): number | null;
  setGeneralDiscount(userType: UserType, discount: number): void;

  getProductDiscount(userType: UserType, productType: ProductType): number | null;
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
}
