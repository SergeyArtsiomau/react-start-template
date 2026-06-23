export const formatOperationAmount = (amount: string | number): string => {
  const normalized = String(amount).replace(/\s/g, '').replace(',', '.');

  if (!normalized) {
    return String(amount);
  }

  const numeric = Number(normalized);

  if (Number.isNaN(numeric)) {
    return String(amount);
  }

  const formatted = new Intl.NumberFormat('ru-RU').format(Math.abs(numeric));

  return numeric < 0 ? `− ${formatted} ₽` : `${formatted} ₽`;
};
