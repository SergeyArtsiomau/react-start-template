const MIN_DISCOUNT = 0;
const MAX_DISCOUNT = 100;

export class InvalidDiscountError extends Error {
  constructor(discount: number) {
    super(`Скидка должна быть в диапазоне от ${MIN_DISCOUNT} до ${MAX_DISCOUNT}, получено: ${discount}`);
    this.name = 'InvalidDiscountError';
  }
}

export const validateDiscount = (discount: number): void => {
  if (!Number.isFinite(discount) || discount < MIN_DISCOUNT || discount > MAX_DISCOUNT) {
    throw new InvalidDiscountError(discount);
  }
};
