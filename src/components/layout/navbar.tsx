import { Link, NavLink } from 'react-router-dom';

import { cn } from '@/utils/cn';

const NAVIGATION_MENU = [
  { id: 1, name: 'Top Up', path: '/topup' },
  { id: 2, name: 'Transaction', path: '/history/transaction' },
  { id: 3, name: 'Akun', path: '/akun' },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-gray-200 bg-white">
      <nav className="layout flex items-center justify-between">
        <Link to="/" className="flex items-center gap-x-3">
          <img src="/images/logo.png" alt="" />
          <div className="text-lg font-semibold uppercase">SIMS PPOB</div>
        </Link>

        <div className="flex items-center gap-x-10">
          {NAVIGATION_MENU.map((nav) => (
            <NavLink to={nav.path} key={nav.id}>
              {({ isActive }) => (
                <span
                  className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-red-500' : 'text-gray-800'
                  )}>
                  {nav.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};
