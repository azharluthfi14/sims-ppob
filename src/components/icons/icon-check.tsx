import { cn } from '@/utils/cn';

import type { IconProps } from './types';

export default function IconCheck({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-6 text-gray-800', className)}
      {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
