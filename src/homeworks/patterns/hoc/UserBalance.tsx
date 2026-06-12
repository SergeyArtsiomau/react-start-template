import React, { useEffect, useState } from 'react';
import { withLoading } from './withLoading';
import { UserBalanceView } from './UserBalanceView';

const fetchBalance = (): Promise<number> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(125_430), 1200);
  });

const UserBalanceViewWithLoading = withLoading(UserBalanceView);

export function UserBalance() {
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

  return <UserBalanceViewWithLoading isLoading={isLoading} balance={balance} />;
}
