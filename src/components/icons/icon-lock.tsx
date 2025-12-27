import { cn } from '@/utils/cn';

import type { IconProps } from './types';

export default function IconLock({ className, ...props }: IconProps) {
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
      <circle cx={12} cy={16} r={1} />
      <rect x={3} y={10} width={18} height={12} rx={2} />
      <path d="M7 10V7a5 5 0 0110 0v3" />
    </svg>
  );
}
