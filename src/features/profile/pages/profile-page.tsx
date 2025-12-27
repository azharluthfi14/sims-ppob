import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { IconAt, IconPencil, IconUser } from '@/components/icons';
import { Navbar } from '@/components/layout/navbar';
import { Button, Input } from '@/components/ui';
import {
  logoutUser,
  updateAvatarFormDataSchema,
  type UpdateAvatarPayload,
  type UpdateProfileUserPayload,
  updateProfileUserSchema,
  useGetProfileQuery,
  useUpdateAvatarProfileMutation,
  useUpdateProfileDataMutation,
} from '@/store/modules';
import { cn } from '@/utils/cn';

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { data: user } = useGetProfileQuery();
  const [updateData, { isLoading: loadingEditData }] = useUpdateProfileDataMutation();
  const [uploadAvatar] = useUpdateAvatarProfileMutation();

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const {
    control,
    reset,
    getValues,
    formState: { errors: errorProfileData, isValid },
    handleSubmit: handleSubmitProfileData,
  } = useForm<UpdateProfileUserPayload>({
    resolver: zodResolver(updateProfileUserSchema),
    mode: 'onChange',
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const {
    watch,
    register,
    handleSubmit: handleSubmitAvatar,
    formState: { errors },
  } = useForm<UpdateAvatarPayload>({
    resolver: zodResolver(updateAvatarFormDataSchema),
    mode: 'onChange',
    defaultValues: {
      profile_image: undefined,
    },
  });

  const watchAvatarImage = watch('profile_image');

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

  const onUploadAvatar = useCallback(
    async (data: UpdateAvatarPayload) => {
      const file = data.profile_image?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        await uploadAvatar(formData).unwrap();
        toast.success('Foto profil berhasil diperbarui');
      } catch {
        toast.error('Gagal upload foto profile');
      }
    },
    [uploadAvatar]
  );

  const onUpdateProfileData = async () => {
    try {
      const payload = {
        email: getValues('email'),
        first_name: getValues('first_name'),
        last_name: getValues('last_name'),
      };
      await updateData(payload).unwrap();

      reset(payload);
      toast.success('Update profile sukses');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (watchAvatarImage && watchAvatarImage.length > 0) {
      handleSubmitAvatar(onUploadAvatar)();
    }
  }, [watchAvatarImage, handleSubmitAvatar, onUploadAvatar]);

  useEffect(() => {
    if (watchAvatarImage && watchAvatarImage.length > 0) {
      const file = watchAvatarImage[0];
      const preview = URL.createObjectURL(file);
      setPreviewAvatar(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [watchAvatarImage]);

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, reset]);

  return (
    <>
      <Navbar />
      <div className="layout space-y-10 py-12">
        <div className="flex w-full flex-col items-center justify-end">
          <div className="relative mb-1">
            <div className="relative grid aspect-square size-30 cursor-pointer place-content-center rounded-full border border-gray-200">
              {previewAvatar ? (
                <div className="relative">
                  <label htmlFor="image-avatar" className="relative cursor-pointer">
                    <img
                      src={previewAvatar}
                      alt="preview-avatar"
                      className="size-30 cursor-pointer rounded-full object-cover"
                    />
                    <input
                      id="image-avatar"
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      {...register('profile_image')}
                    />
                    <div className="absolute end-0 bottom-2 grid size-7 place-content-center rounded-full border border-gray-200 bg-white">
                      <IconPencil className="size-4 text-gray-500" />
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <label htmlFor="image-avatar" className="relative cursor-pointer">
                    <img
                      src={
                        user?.profile_image.includes('null')
                          ? '/images/avatar.png'
                          : user?.profile_image
                      }
                      alt="avatar"
                      className="size-30 cursor-pointer rounded-full object-cover"
                    />
                    <input
                      id="image-avatar"
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      {...register('profile_image')}
                    />
                    <div className="absolute end-0 bottom-2 grid size-7 place-content-center rounded-full border border-gray-200 bg-white">
                      <IconPencil className="size-4 text-gray-500" />
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          {errors.profile_image && (
            <p className="text-danger text-xs">{errors.profile_image.message}</p>
          )}
          <h1 className="my-6 text-3xl font-semibold capitalize">
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
                      className={cn(
                        'h-12 ps-10',
                        errorProfileData.email ? 'border-red-500' : 'border-gray-300'
                      )}
                      {...field}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <IconAt
                    className={cn(
                      'size-4',
                      errorProfileData.email ? 'text-danger' : 'text-gray-400'
                    )}
                  />
                </div>
              </div>
              {errorProfileData.email && (
                <p className="text-danger mt-2 text-right text-xs">
                  {errorProfileData.email.message}
                </p>
              )}
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
                      className={cn(
                        'h-12 ps-10',
                        errorProfileData.first_name ? 'border-red-500' : 'border-gray-300'
                      )}
                      {...field}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <IconUser
                    className={cn(
                      'size-4',
                      errorProfileData.first_name ? 'text-danger' : 'text-gray-400'
                    )}
                  />
                </div>
              </div>
              {errorProfileData.first_name && (
                <p className="text-danger mt-2 text-right text-xs">
                  {errorProfileData.first_name.message}
                </p>
              )}
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
                      className={cn(
                        'h-12 ps-10',
                        errorProfileData.last_name ? 'border-red-500' : 'border-gray-300'
                      )}
                      {...field}
                    />
                  )}
                />
                <div
                  className={cn(
                    'pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 peer-disabled:pointer-events-none peer-disabled:opacity-50'
                  )}>
                  <IconUser
                    className={cn(
                      'size-4',
                      errorProfileData.last_name ? 'text-danger' : 'text-gray-400'
                    )}
                  />
                </div>
              </div>
              {errorProfileData.last_name && (
                <p className="text-danger mt-2 text-right text-xs">
                  {errorProfileData.last_name.message}
                </p>
              )}
            </div>

            <div className="mt-10 space-y-4">
              {!isEdit ? (
                <>
                  <Button
                    variant={'outline'}
                    onClick={handleEdit}
                    className="text-danger w-full cursor-pointer border-red-500"
                    size="lg">
                    Edit Profile
                  </Button>
                  <Button onClick={handleLogout} className="w-full cursor-pointer" size="lg">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSubmitProfileData(onUpdateProfileData)}
                    isLoading={loadingEditData}
                    disabled={!isEdit || !isValid}
                    className="w-full cursor-pointer"
                    size="lg">
                    Simpan
                  </Button>
                  <Button
                    variant={'outline'}
                    onClick={handleCancel}
                    className="text-danger w-full cursor-pointer border-red-500"
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
}
