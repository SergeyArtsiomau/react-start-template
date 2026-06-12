import React from 'react';
import { useTimer } from './useTimer';
import './timer.css';

export function Timer() {
  const { seconds, start, pause, reset } = useTimer();

  return (
    <div className="timer">
      <div className="timer__display">{seconds} сек</div>
      <div className="timer__controls">
        <button type="button" onClick={start}>
          Старт
        </button>
        <button type="button" onClick={pause}>
          Пауза
        </button>
        <button type="button" onClick={reset}>
          Сброс
        </button>
      </div>
    </div>
  );
}
