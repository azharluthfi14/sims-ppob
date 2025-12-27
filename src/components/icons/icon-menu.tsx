import { cn } from '@/utils/cn';

import type { IconProps } from './types';

export default function IconMenu({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-6 text-gray-800', className)}
      {...props}>
      <path d="M4 5h16M4 12h16M4 19h16" />
    </svg>
  );
}
