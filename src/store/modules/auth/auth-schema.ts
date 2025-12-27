import { z } from 'zod';

export const userSchema = z.object({
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  profile_image: z.string(),
});

export const loginForm = z.object({
  email: z.email('Alamat email tidak valid').min(1, 'Alamat email tidak boleh kosong'),
  password: z.string().min(1, 'Password tidak boleh kosong'),
});

export const loginResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.object({
    token: z.string(),
  }),
});

export const updateProfileUserSchema = z.object({
  email: z.email('Alamat email tidak valid').min(1, 'Alamat email tidak boleh kosong'),
  first_name: z.string().min(1, 'Nama depan tidak boleh kosong'),
  last_name: z.string().min(1, 'Nama belakang tidak boleh kosong'),
});

const MAX_IMAGE_SIZE = 100 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const updateAvatarFormDataSchema = z.object({
  profile_image: z
    .instanceof(FileList)
    .refine((file) => file.length === 1, 'Gambar tidak boleh lebih dari 1')
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file[0].type), {
      message: 'Format gambar harus JPEG atau PNG',
    })
    .refine((file) => file[0].size <= MAX_IMAGE_SIZE, {
      message: 'Ukuran gambar maksimal 100 KB',
    }),
});

export const updateAvatarPayloadScehma = z.object({
  profile_image: z.instanceof(File),
});

export const registerForm = z
  .object({
    email: z.email('Alamat email tidak valid').min(1, 'Alamat email tidak boleh kosong'),
    first_name: z.string().min(1, 'Nama depan tidak boleh kosong'),
    last_name: z.string().min(1, 'Nama belakang tidak boleh kosong'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirm_password: z.string().min(1, 'Konfirmasi password tidak boleh kosong').max(18),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Password tidak sama',
  });

export const registerPayloadSchema = z.object({
  email: z.email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  password: z.string().min(8).max(18),
});

export const registerResponse = z.object({
  status: z.number(),
  message: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type LoginForm = z.infer<typeof loginForm>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterForm = z.infer<typeof registerForm>;
export type RegisterPayload = z.infer<typeof registerPayloadSchema>;
export type RegisterResponse = z.infer<typeof registerResponse>;
export type UpdateAvatarPayload = z.infer<typeof updateAvatarFormDataSchema>;
export type UpdateProfileUserPayload = z.infer<typeof updateProfileUserSchema>;
