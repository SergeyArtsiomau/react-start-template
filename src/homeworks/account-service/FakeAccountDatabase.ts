import type { IAccountDatabase } from './IAccountDatabase';
import type { ProductType, UserType } from './types';

const buildProductDiscountKey = (userType: UserType, productType: ProductType): string => `${userType}:${productType}`;

export class FakeAccountDatabase implements IAccountDatabase {
  private readonly generalDiscounts = new Map<UserType, number>();

  private readonly productDiscounts = new Map<string, number>();

  getGeneralDiscount(userType: UserType): number | null {
    return this.generalDiscounts.get(userType) ?? null;
  }

  setGeneralDiscount(userType: UserType, discount: number): void {
    this.generalDiscounts.set(userType, discount);
  }

  getProductDiscount(userType: UserType, productType: ProductType): number | null {
    return this.productDiscounts.get(buildProductDiscountKey(userType, productType)) ?? null;
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    this.productDiscounts.set(buildProductDiscountKey(userType, productType), discount);
  }
}
