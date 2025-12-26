import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type LoginForm, useLoginMutation } from '@/store/modules/auth';

import { FormLogin } from '../components';

export const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmitLogin = async (value: LoginForm) => {
    try {
      await login(value).unwrap();
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex w-full flex-col lg:max-w-md">
      <div className="mb-12 flex flex-col items-center justify-center space-y-12">
        <div className="flex items-center gap-x-3">
          <img src="/images/logo.png" alt="" />
          <div className="text-xl font-semibold uppercase">SIMS PPOB</div>
        </div>
        <h2 className="w-8/12 text-center text-2xl font-semibold">
          Masuk atau buat akun untuk memulai
        </h2>
      </div>
      <FormLogin onSubmit={handleSubmitLogin} isLoading={isLoading} />
      <div className="mt-6 text-center text-sm text-gray-400">
        belum punya akun? registrasi{' '}
        <Link to="/register" className="font-semibold text-red-500">
          di sini
        </Link>
      </div>
    </div>
  );
};
