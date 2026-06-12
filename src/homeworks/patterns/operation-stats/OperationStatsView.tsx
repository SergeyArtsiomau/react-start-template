import React from 'react';
import './operation-stats.css';

export interface OperationStatsData {
  total: number;
  income: number;
  expense: number;
  balance: number;
}

interface OperationStatsViewProps {
  stats: OperationStatsData;
  onRefresh: () => void;
}

export function OperationStatsView({ stats, onRefresh }: OperationStatsViewProps) {
  return (
    <div className="operation-stats-before">
      <button type="button" className="operation-stats-before__button" onClick={onRefresh}>
        Обновить данные
      </button>
      <div className="operation-stats">
        <div className="operation-stats__card">
          <p className="operation-stats__label">Операций</p>
          <p className="operation-stats__value">{stats.total}</p>
        </div>
        <div className="operation-stats__card">
          <p className="operation-stats__label">Доход</p>
          <p className="operation-stats__value">+{stats.income.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div className="operation-stats__card">
          <p className="operation-stats__label">Расход</p>
          <p className="operation-stats__value">−{stats.expense.toLocaleString('ru-RU')} ₽</p>
        </div>
      </div>
      <p style={{ marginTop: 12, color: '#6b7280' }}>Баланс: {stats.balance.toLocaleString('ru-RU')} ₽</p>
    </div>
  );
}
