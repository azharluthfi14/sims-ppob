import { cn } from '@/utils/cn';

import type { IconProps } from './types';

export default function IconDocs({ className, ...props }: IconProps) {
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
      <path d="M6 22a2 2 0 01-2-2V4a2 2 0 012-2h8a2.4 2.4 0 011.704.706l3.588 3.588A2.4 2.4 0 0120 8v12a2 2 0 01-2 2z" />
      <path d="M14 2v5a1 1 0 001 1h5M10 9H8M16 13H8M16 17H8" />
    </svg>
  );
}
