import React, { useEffect, useRef, useState } from 'react';
import './timer.css';

/**
 * До рефакторинга: вся логика таймера внутри компонента.
 */
export function TimerBefore() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }

    intervalRef.current = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <div className="timer__display">{seconds} сек</div>
      <div className="timer__controls">
        <button type="button" onClick={handleStart}>
          Старт
        </button>
        <button type="button" onClick={handlePause}>
          Пауза
        </button>
        <button type="button" onClick={handleReset}>
          Сброс
        </button>
      </div>
    </div>
  );
}
