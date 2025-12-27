import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IconAt, IconEye, IconEyeOff, IconLock, IconUser } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { type RegisterForm, registerForm } from '@/store/modules/auth';
import { cn } from '@/utils/cn';

interface Props {
  onSubmit: (data: RegisterForm) => void;
  isLoading: boolean;
}

export const FormRegister = ({ onSubmit, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="relative">
          <Input
            type="email"
            placeholder="masukan email anda"
            className={cn('h-12 ps-10', errors.email ? 'border-red-500' : 'border-gray-300')}
            {...register('email')}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
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
            type="text"
            placeholder="nama depan"
            className={cn('h-12 ps-10', errors.first_name ? 'border-red-500' : 'border-gray-300')}
            {...register('first_name')}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            <IconUser
              className={cn('size-4', errors.first_name ? 'text-danger' : 'text-gray-400')}
            />
          </div>
        </div>
        {errors.first_name && (
          <div className="text-danger mt-2 text-right text-xs">{errors.first_name.message}</div>
        )}
      </div>
      <div>
        <div className="relative">
          <Input
            type="text"
            placeholder="nama belakang"
            className={cn('h-12 ps-10', errors.last_name ? 'border-red-500' : 'border-gray-300')}
            {...register('last_name')}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            <IconUser
              className={cn('size-4', errors.last_name ? 'text-danger' : 'text-gray-400')}
            />
          </div>
        </div>
        {errors.last_name && (
          <div className="text-danger mt-1 text-right text-xs">{errors.last_name.message}</div>
        )}
      </div>
      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="buat password"
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
          <div className="text-danger mt-1 text-right text-xs">{errors.password.message}</div>
        )}
      </div>
      <div>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="konfirmasi password"
            className={cn(
              'h-12 ps-10',
              errors.confirm_password ? 'border-red-500' : 'border-gray-300'
            )}
            {...register('confirm_password')}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            <IconUser
              className={cn('size-4', errors.confirm_password ? 'text-danger' : 'text-gray-400')}
            />{' '}
          </div>
          <div
            onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            className="absolute inset-y-0 end-0 flex cursor-pointer items-center pr-4 peer-disabled:pointer-events-none peer-disabled:opacity-50">
            {showConfirmPassword ? (
              <IconEye className="size-4 text-gray-400" />
            ) : (
              <IconEyeOff className="size-4 text-gray-400" />
            )}
          </div>
        </div>
        {errors.confirm_password && (
          <div className="text-danger mt-1 text-right text-xs">
            {errors.confirm_password.message}
          </div>
        )}
      </div>

      <Button isLoading={isLoading} className="w-full cursor-pointer" size="lg">
        Registrasi
      </Button>
    </form>
  );
};
