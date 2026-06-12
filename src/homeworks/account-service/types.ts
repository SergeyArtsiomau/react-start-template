export enum UserType {
  Standard = 'Standard',
  Premium = 'Premium',
  Gold = 'Gold',
  Free = 'Free',
}

export enum ProductType {
  Car = 'Car',
  Toy = 'Toy',
  Food = 'Food',
}

export const USER_TYPES = Object.values(UserType);
export const PRODUCT_TYPES = Object.values(ProductType);
