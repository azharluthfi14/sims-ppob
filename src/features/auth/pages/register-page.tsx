import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  type RegisterForm,
  registerPayloadSchema,
  useRegisterMutation,
} from '@/store/modules/auth';

import { FormRegister } from '../components';

export const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleSubmitRegister = async (value: RegisterForm) => {
    try {
      const payload = registerPayloadSchema.parse(value);
      await register(payload).unwrap();
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="mb-12 flex flex-col items-center justify-center space-y-12">
        <div className="flex items-center gap-x-3">
          <img src="/images/logo.png" alt="" />
          <div className="text-xl font-semibold uppercase">SIMS PPOB</div>
        </div>
        <h2 className="w-8/12 text-center text-2xl font-semibold">
          Lengkapi data untuk membuat akun
        </h2>
      </div>
      <FormRegister onSubmit={handleSubmitRegister} isLoading={isLoading} />
      <div className="mt-6 text-center text-sm text-gray-400">
        sudah punya akun? login{' '}
        <Link to="/login" className="font-semibold text-red-500">
          di sini
        </Link>
      </div>
    </div>
  );
};
