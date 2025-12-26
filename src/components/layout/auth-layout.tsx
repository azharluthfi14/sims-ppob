import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <section className="flex min-h-screen px-5">
      {/* FORM */}
      <div className="flex w-full items-center justify-center lg:w-[50%]">
        <Outlet />
      </div>

      {/* Images */}
      <div className="fixed top-0 right-0 bottom-0 hidden h-screen w-[50%] lg:block">
        <img
          src="/images/illustration-auth.png"
          loading="lazy"
          className="h-full w-full object-cover"
          alt="illustration-login-images"
        />
      </div>
    </section>
  );
};
