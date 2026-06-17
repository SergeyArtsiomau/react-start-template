export const formatOperationAmount = (amount: string): string => {
  const normalized = amount.replace(/\s/g, '').replace(',', '.');

  if (!normalized) {
    return amount;
  }

  const numeric = Number(normalized);

  if (Number.isNaN(numeric)) {
    return amount;
  }

  const formatted = new Intl.NumberFormat('ru-RU').format(Math.abs(numeric));

  return numeric < 0 ? `− ${formatted} ₽` : `${formatted} ₽`;
};
