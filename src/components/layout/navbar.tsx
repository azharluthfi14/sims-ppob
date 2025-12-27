import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { IconMenu, IconX } from '@/components/icons';
import { cn } from '@/utils/cn';

import { Button } from '../ui';

const NAVIGATION_MENU = [
  { id: 1, name: 'Top Up', path: '/topup' },
  { id: 2, name: 'Transaction', path: '/history/transaction' },
  { id: 3, name: 'Akun', path: '/akun' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-gray-200 bg-white">
      <nav className="layout flex items-center justify-between">
        <Link to="/" className="flex items-center gap-x-3">
          <img src="/images/logo.png" alt="" />
          <div className="text-lg font-semibold uppercase">SIMS PPOB</div>
        </Link>
        <div className="hidden items-center gap-x-10 lg:flex">
          {NAVIGATION_MENU.map((nav) => (
            <NavLink to={nav.path} key={nav.id}>
              {({ isActive }) => (
                <span
                  className={cn('text-sm font-medium', isActive ? 'text-danger' : 'text-gray-800')}>
                  {nav.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
        <Button
          size="icon-lg"
          onClick={() => setOpen(true)}
          className="flex cursor-pointer lg:hidden">
          <IconMenu className="size-6" />
        </Button>
        <MobileSidebar open={open} onClose={() => setOpen(false)} />
      </nav>
    </header>
  );
};

function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transition-transform lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full'
        )}>
        <div className="flex h-16 items-center justify-between border-b border-gray-300 px-4">
          <Button size="icon" onClick={onClose} className="cursor-pointer">
            <IconX className="size-5" />
          </Button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {NAVIGATION_MENU.map((nav) => (
            <NavLink
              to={nav.path}
              key={nav.id}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'rounded px-3 py-2 text-sm font-medium',
                  isActive ? 'text-danger bg-red-50' : 'text-gray-700 hover:bg-gray-100'
                )
              }>
              {nav.name}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
