import type { Banner } from '@/store/modules/information';

interface Props {
  banners: Banner[];
  isLoading: boolean;
}
export const ListPromo = ({ banners, isLoading }: Props) => {
  return (
    <div className="layout space-y-6">
      <h2 className="font-semibold">Temukan promo menarik</h2>
      <div className="no-scrollbar flex w-full snap-x gap-x-6 overflow-x-auto">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 w-100 animate-pulse rounded bg-gray-300" />
            ))
          : banners?.map((banner, i) => (
              <div className="shrink-0 snap-center" key={i}>
                <img
                  src={banner.banner_image}
                  alt=""
                  className="h-40 w-80 shrink-0 rounded-lg bg-white"
                />
              </div>
            ))}
      </div>
    </div>
  );
};
