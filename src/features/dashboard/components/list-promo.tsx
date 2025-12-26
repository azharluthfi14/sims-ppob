import type { Banner } from '@/store/modules/information';

interface Props {
  banners: Banner[];
}
export const ListPromo = ({ banners }: Props) => {
  return (
    <div className="space-y-6">
      <div className="layout">
        <h2 className="font-semibold">Temukan promo menarik</h2>
      </div>
      <div className="no-scrollbar flex w-full snap-x gap-x-6 overflow-x-auto pl-20">
        {banners?.map((banner, i) => (
          <div className="shrink-0 snap-center lg:last:pr-36" key={i}>
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
