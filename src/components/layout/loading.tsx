import { IconLoader } from '@/components/icons';

export const LoadingLayout = () => {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <IconLoader className="text-danger mb-4 size-10 animate-spin" />
      <div className="animate-pulse text-lg font-semibold text-gray-400">Please wait ...</div>
    </div>
  );
};
