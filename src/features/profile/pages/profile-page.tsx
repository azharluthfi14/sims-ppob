import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign, Pencil, User } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Navbar } from '@/components/layout/navbar';
import { Button, Input } from '@/components/ui';
import {
  logoutUser,
  type UpdateProfileUserPayload,
  updateProfileUserSchema,
  useGetProfileQuery,
} from '@/store/modules';
import { cn } from '@/utils/cn';

export const ProfilePage = () => {
  const { data: user } = useGetProfileQuery();
  const dispatch = useDispatch();
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { control, reset } = useForm<UpdateProfileUserPayload>({
    resolver: zodResolver(updateProfileUserSchema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    reset();
    setIsEdit(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Navbar />
      <div className="layout space-y-10 py-12">
        <div className="flex w-full flex-col items-center justify-end">
          <div className="relative mb-5">
            <div className="relative grid aspect-square size-30 cursor-pointer place-content-center rounded-full border border-gray-200">
              {previewAvatar ? (
                <>
                  <img src="" alt="" />
                  <div>edit</div>
                </>
              ) : (
                <div className="relative">
                  <label htmlFor="image-avatar" className="relative cursor-pointer">
                    <img
                      src="images/avatar.png"
                      alt="avatar"
                      className="size-30 cursor-pointer rounded-full object-cover"
                    />
                    <input
                      id="image-avatar"
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                    />
                    <div className="absolute end-0 bottom-2 grid size-7 place-content-center rounded-full border border-gray-200 bg-white">
                      <Pencil className="size-4 text-gray-500" />
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <h1 className="mb-6 text-3xl font-semibold">
            {user?.first_name + ' ' + user?.last_name}
          </h1>
          <div className="w-full max-w-2xl space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      disabled={!isEdit}
                      placeholder="masukan email anda"
                      className={cn('h-12 ps-10')}
                      {...field}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <AtSign className={cn('size-4 text-gray-400')} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="first_name" className="block text-sm font-medium">
                Nama Depan
              </label>
              <div className="relative">
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      disabled={!isEdit}
                      placeholder="masukan napa depan anda"
                      className={cn('h-12 ps-10')}
                      {...field}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <User className={cn('size-4 text-gray-400')} />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="last_name" className="block text-sm font-medium">
                Nama Belakang
              </label>
              <div className="relative">
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      disabled={!isEdit}
                      placeholder="masukan email anda"
                      className={cn('h-12 ps-10')}
                      {...field}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <User className={cn('size-4 text-gray-400')} />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              {!isEdit ? (
                <>
                  <Button
                    variant={'outline'}
                    onClick={handleEdit}
                    className="w-full cursor-pointer border-red-500 text-red-500"
                    size="lg">
                    Edit Profile
                  </Button>
                  <Button onClick={handleLogout} className="w-full cursor-pointer" size="lg">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full cursor-pointer" size="lg">
                    Simpan
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={handleCancel}
                    className="w-full cursor-pointer border-red-500 text-red-500"
                    size="lg">
                    Batalkan
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
