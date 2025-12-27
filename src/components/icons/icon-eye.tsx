import { cn } from '@/utils/cn';

import type { IconProps } from './types';

export default function IconEye({ className, ...props }: IconProps) {
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
      className={cn('size-6', className)}
      {...props}>
      <path d="M2.062 12.348a1 1 0 010-.696 10.75 10.75 0 0119.876 0 1 1 0 010 .696 10.75 10.75 0 01-19.876 0" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
}
