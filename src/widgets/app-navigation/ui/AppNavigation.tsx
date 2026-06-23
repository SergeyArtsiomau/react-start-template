import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import { ROUTES } from 'src/shared/config/routes';
import './app-navigation.css';

export type AppNavigationProps = {
  userEmail: string;
  onLogout: () => void;
};

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn('app-navigation__link', isActive && 'app-navigation__link--active');

export function AppNavigation({ userEmail, onLogout }: AppNavigationProps) {
  return (
    <nav className="app-navigation" aria-label="Основная навигация">
      <NavLink to={ROUTES.PROFILE} end className={getNavLinkClassName}>
        Профиль
      </NavLink>
      <NavLink to={ROUTES.OPERATIONS} className={getNavLinkClassName}>
        Операции
      </NavLink>
      <NavLink to={ROUTES.PRODUCTS} className={getNavLinkClassName}>
        Товары
      </NavLink>
      <NavLink to={ROUTES.CART} className={getNavLinkClassName}>
        Корзина
      </NavLink>
      <span className="app-navigation__user">{userEmail}</span>
      <button type="button" className="app-navigation__logout" onClick={onLogout}>
        Выйти
      </button>
    </nav>
  );
}
