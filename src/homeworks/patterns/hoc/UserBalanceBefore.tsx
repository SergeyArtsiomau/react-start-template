import React, { useEffect, useState } from 'react';
import './hoc.css';

const fetchBalance = (): Promise<number> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(125_430), 1200);
  });

/**
 * До рефакторинга: логика загрузки дублируется в каждом подобном компоненте.
 */
export function UserBalanceBefore() {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetchBalance().then((value) => {
      if (isMounted) {
        setBalance(value);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className="balance-loading">Загрузка данных...</div>;
  }

  return (
    <div className="balance-card">
      <p className="balance-card__title">Баланс счёта</p>
      <p className="balance-card__amount">{balance.toLocaleString('ru-RU')} ₽</p>
    </div>
  );
}
