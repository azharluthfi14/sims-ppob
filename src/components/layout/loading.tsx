import { Loader2 } from 'lucide-react';

export const LoadingLayout = () => {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <Loader2 className="mb-4 size-10 animate-spin text-red-500" />
      <div className="animate-pulse text-lg font-semibold text-gray-400">Please wait ...</div>
    </div>
  );
};
