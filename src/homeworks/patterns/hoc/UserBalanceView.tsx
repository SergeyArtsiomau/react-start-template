import React from 'react';
import './hoc.css';

interface UserBalanceViewProps {
  balance: number;
}

export function UserBalanceView({ balance }: UserBalanceViewProps) {
  return (
    <div className="balance-card">
      <p className="balance-card__title">Баланс счёта</p>
      <p className="balance-card__amount">{balance.toLocaleString('ru-RU')} ₽</p>
    </div>
  );
}
