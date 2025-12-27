import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IconAt, IconEye, IconEyeOff, IconLock } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { type LoginForm, loginForm } from '@/store/modules/auth';
import { cn } from '@/utils/cn';

interface Props {
  onSubmit: (data: LoginForm) => void;
  isLoading: boolean;
}

export const FormLogin = ({ onSubmit, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(loginForm),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="relative">
          <Input
            type="email"
            placeholder="masukan email anda"
            className={cn('h-12 ps-10', errors.email ? 'border-red-500' : 'border-gray-300')}
            {...register('email')}
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
            )}>
            <IconAt className={cn('size-4', errors.email ? 'text-danger' : 'text-gray-400')} />
          </div>
        </div>
        {errors.email && (
          <div className="text-danger mt-2 text-right text-xs">{errors.email.message}</div>
        )}
      </div>
      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="masukan password anda"
            className={cn('h-12 ps-10', errors.password ? 'border-red-500' : 'border-gray-300')}
            {...register('password')}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            <IconLock className={cn('size-4', errors.password ? 'text-danger' : 'text-gray-400')} />
          </div>
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 end-0 flex cursor-pointer items-center pr-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            {showPassword ? (
              <IconEye className="size-4 text-gray-400" />
            ) : (
              <IconEyeOff className="size-4 text-gray-400" />
            )}
          </div>
        </div>
        {errors.password && (
          <div className="text-danger mt-2 text-right text-xs">{errors.password.message}</div>
        )}
      </div>
      <Button isLoading={isLoading} className="w-full cursor-pointer select-none" size="lg">
        Masuk
      </Button>
    </form>
  );
};
